// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureLeaseHaven is SepoliaConfig {
    using FHE for *;
    
    struct Property {
        euint32 propertyId;
        euint32 monthlyRent;
        euint32 deposit;
        euint32 bedrooms;
        euint32 bathrooms;
        ebool isAvailable;
        ebool isVerified;
        string location;
        string description;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct LeaseApplication {
        euint32 applicationId;
        euint32 propertyId;
        euint32 monthlyIncome;
        euint32 creditScore;
        ebool isApproved;
        ebool isRejected;
        string personalInfo;
        address applicant;
        uint256 appliedAt;
        uint256 reviewedAt;
    }
    
    struct LeaseAgreement {
        euint32 agreementId;
        euint32 propertyId;
        euint32 monthlyRent;
        euint32 deposit;
        euint32 leaseDuration;
        ebool isActive;
        ebool isTerminated;
        address tenant;
        address landlord;
        uint256 startDate;
        uint256 endDate;
        uint256 createdAt;
    }
    
    struct Payment {
        euint32 paymentId;
        euint32 agreementId;
        euint32 amount;
        ebool isPaid;
        address payer;
        uint256 dueDate;
        uint256 paidAt;
    }
    
    struct Reputation {
        euint32 score;
        euint32 totalReviews;
        ebool isVerified;
        address user;
        uint256 lastUpdated;
    }
    
    mapping(uint256 => Property) public properties;
    mapping(uint256 => LeaseApplication) public applications;
    mapping(uint256 => LeaseAgreement) public agreements;
    mapping(uint256 => Payment) public payments;
    mapping(address => Reputation) public reputations;
    
    uint256 public propertyCounter;
    uint256 public applicationCounter;
    uint256 public agreementCounter;
    uint256 public paymentCounter;
    
    address public owner;
    address public verifier;
    
    event PropertyListed(uint256 indexed propertyId, address indexed owner, string location);
    event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed propertyId, address indexed applicant);
    event ApplicationReviewed(uint256 indexed applicationId, bool approved);
    event LeaseAgreementCreated(uint256 indexed agreementId, address indexed tenant, address indexed landlord);
    event PaymentMade(uint256 indexed paymentId, uint256 indexed agreementId, address indexed payer);
    event ReputationUpdated(address indexed user, uint32 score);
    event PropertyVerified(uint256 indexed propertyId, bool isVerified);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function listProperty(
        string memory _location,
        string memory _description,
        externalEuint32 _monthlyRent,
        externalEuint32 _deposit,
        externalEuint32 _bedrooms,
        externalEuint32 _bathrooms,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        uint256 propertyId = propertyCounter++;
        
        // Convert external encrypted values to internal
        euint32 monthlyRent = FHE.fromExternal(_monthlyRent, inputProof);
        euint32 deposit = FHE.fromExternal(_deposit, inputProof);
        euint32 bedrooms = FHE.fromExternal(_bedrooms, inputProof);
        euint32 bathrooms = FHE.fromExternal(_bathrooms, inputProof);
        
        properties[propertyId] = Property({
            propertyId: FHE.asEuint32(0), // Will be set properly later
            monthlyRent: monthlyRent,
            deposit: deposit,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            isAvailable: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            location: _location,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit PropertyListed(propertyId, msg.sender, _location);
        return propertyId;
    }
    
    function submitApplication(
        uint256 _propertyId,
        externalEuint32 _monthlyIncome,
        externalEuint32 _creditScore,
        string memory _personalInfo,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(properties[_propertyId].owner != address(0), "Property does not exist");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert external encrypted values to internal
        euint32 monthlyIncome = FHE.fromExternal(_monthlyIncome, inputProof);
        euint32 creditScore = FHE.fromExternal(_creditScore, inputProof);
        
        applications[applicationId] = LeaseApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            propertyId: FHE.asEuint32(_propertyId),
            monthlyIncome: monthlyIncome,
            creditScore: creditScore,
            isApproved: FHE.asEbool(false),
            isRejected: FHE.asEbool(false),
            personalInfo: _personalInfo,
            applicant: msg.sender,
            appliedAt: block.timestamp,
            reviewedAt: 0
        });
        
        emit ApplicationSubmitted(applicationId, _propertyId, msg.sender);
        return applicationId;
    }
    
    function reviewApplication(
        uint256 _applicationId,
        bool _approved
    ) public {
        require(msg.sender == verifier || msg.sender == owner, "Only verifier or owner can review");
        require(applications[_applicationId].applicant != address(0), "Application does not exist");
        
        if (_approved) {
            applications[_applicationId].isApproved = FHE.asEbool(true);
        } else {
            applications[_applicationId].isRejected = FHE.asEbool(true);
        }
        
        applications[_applicationId].reviewedAt = block.timestamp;
        
        emit ApplicationReviewed(_applicationId, _approved);
    }
    
    function createLeaseAgreement(
        uint256 _applicationId,
        externalEuint32 _leaseDuration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(applications[_applicationId].applicant != address(0), "Application does not exist");
        require(applications[_applicationId].reviewedAt > 0, "Application not reviewed yet");
        
        uint256 agreementId = agreementCounter++;
        uint256 propertyId = uint256(FHE.decrypt(applications[_applicationId].propertyId));
        
        // Convert external encrypted value to internal
        euint32 leaseDuration = FHE.fromExternal(_leaseDuration, inputProof);
        
        agreements[agreementId] = LeaseAgreement({
            agreementId: FHE.asEuint32(0), // Will be set properly later
            propertyId: FHE.asEuint32(propertyId),
            monthlyRent: properties[propertyId].monthlyRent,
            deposit: properties[propertyId].deposit,
            leaseDuration: leaseDuration,
            isActive: FHE.asEbool(true),
            isTerminated: FHE.asEbool(false),
            tenant: applications[_applicationId].applicant,
            landlord: properties[propertyId].owner,
            startDate: block.timestamp,
            endDate: block.timestamp + (uint256(FHE.decrypt(leaseDuration)) * 30 days),
            createdAt: block.timestamp
        });
        
        // Mark property as unavailable
        properties[propertyId].isAvailable = FHE.asEbool(false);
        
        emit LeaseAgreementCreated(agreementId, applications[_applicationId].applicant, properties[propertyId].owner);
        return agreementId;
    }
    
    function makePayment(
        uint256 _agreementId,
        externalEuint32 _amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(agreements[_agreementId].tenant != address(0), "Agreement does not exist");
        require(agreements[_agreementId].tenant == msg.sender, "Only tenant can make payment");
        
        uint256 paymentId = paymentCounter++;
        
        // Convert external encrypted value to internal
        euint32 amount = FHE.fromExternal(_amount, inputProof);
        
        payments[paymentId] = Payment({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            agreementId: FHE.asEuint32(_agreementId),
            amount: amount,
            isPaid: FHE.asEbool(true),
            payer: msg.sender,
            dueDate: block.timestamp,
            paidAt: block.timestamp
        });
        
        emit PaymentMade(paymentId, _agreementId, msg.sender);
        return paymentId;
    }
    
    function updateReputation(
        address _user,
        euint32 _score
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(_user != address(0), "Invalid user address");
        
        reputations[_user] = Reputation({
            score: _score,
            totalReviews: FHE.add(reputations[_user].totalReviews, FHE.asEuint32(1)),
            isVerified: FHE.asEbool(true),
            user: _user,
            lastUpdated: block.timestamp
        });
        
        emit ReputationUpdated(_user, 0); // FHE.decrypt(_score) - will be decrypted off-chain
    }
    
    function verifyProperty(uint256 _propertyId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify properties");
        require(properties[_propertyId].owner != address(0), "Property does not exist");
        
        properties[_propertyId].isVerified = FHE.asEbool(_isVerified);
        emit PropertyVerified(_propertyId, _isVerified);
    }
    
    function getPropertyInfo(uint256 _propertyId) public view returns (
        string memory location,
        string memory description,
        uint8 monthlyRent,
        uint8 deposit,
        uint8 bedrooms,
        uint8 bathrooms,
        bool isAvailable,
        bool isVerified,
        address owner,
        uint256 createdAt
    ) {
        Property storage property = properties[_propertyId];
        return (
            property.location,
            property.description,
            0, // FHE.decrypt(property.monthlyRent) - will be decrypted off-chain
            0, // FHE.decrypt(property.deposit) - will be decrypted off-chain
            0, // FHE.decrypt(property.bedrooms) - will be decrypted off-chain
            0, // FHE.decrypt(property.bathrooms) - will be decrypted off-chain
            false, // FHE.decrypt(property.isAvailable) - will be decrypted off-chain
            false, // FHE.decrypt(property.isVerified) - will be decrypted off-chain
            property.owner,
            property.createdAt
        );
    }
    
    function getApplicationInfo(uint256 _applicationId) public view returns (
        uint8 propertyId,
        uint8 monthlyIncome,
        uint8 creditScore,
        bool isApproved,
        bool isRejected,
        string memory personalInfo,
        address applicant,
        uint256 appliedAt
    ) {
        LeaseApplication storage application = applications[_applicationId];
        return (
            0, // FHE.decrypt(application.propertyId) - will be decrypted off-chain
            0, // FHE.decrypt(application.monthlyIncome) - will be decrypted off-chain
            0, // FHE.decrypt(application.creditScore) - will be decrypted off-chain
            false, // FHE.decrypt(application.isApproved) - will be decrypted off-chain
            false, // FHE.decrypt(application.isRejected) - will be decrypted off-chain
            application.personalInfo,
            application.applicant,
            application.appliedAt
        );
    }
    
    function getAgreementInfo(uint256 _agreementId) public view returns (
        uint8 propertyId,
        uint8 monthlyRent,
        uint8 deposit,
        uint8 leaseDuration,
        bool isActive,
        bool isTerminated,
        address tenant,
        address landlord,
        uint256 startDate,
        uint256 endDate
    ) {
        LeaseAgreement storage agreement = agreements[_agreementId];
        return (
            0, // FHE.decrypt(agreement.propertyId) - will be decrypted off-chain
            0, // FHE.decrypt(agreement.monthlyRent) - will be decrypted off-chain
            0, // FHE.decrypt(agreement.deposit) - will be decrypted off-chain
            0, // FHE.decrypt(agreement.leaseDuration) - will be decrypted off-chain
            false, // FHE.decrypt(agreement.isActive) - will be decrypted off-chain
            false, // FHE.decrypt(agreement.isTerminated) - will be decrypted off-chain
            agreement.tenant,
            agreement.landlord,
            agreement.startDate,
            agreement.endDate
        );
    }
    
    function getReputation(address _user) public view returns (uint8) {
        return 0; // FHE.decrypt(reputations[_user].score) - will be decrypted off-chain
    }
    
    function terminateLease(uint256 _agreementId) public {
        require(agreements[_agreementId].tenant != address(0), "Agreement does not exist");
        require(
            agreements[_agreementId].tenant == msg.sender || 
            agreements[_agreementId].landlord == msg.sender,
            "Only tenant or landlord can terminate"
        );
        
        agreements[_agreementId].isActive = FHE.asEbool(false);
        agreements[_agreementId].isTerminated = FHE.asEbool(true);
        
        // Mark property as available again
        uint256 propertyId = uint256(FHE.decrypt(agreements[_agreementId].propertyId));
        properties[propertyId].isAvailable = FHE.asEbool(true);
    }
}
