pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract paymentProcess {
    address public admin;
    IERC20 public diaspora;
    
    event paymentDone(
        address payer,
        uint amount,
        uint paymentId,
        uint date
    );

    constructor(address adminAddress, address daiAddress) public {
        admin = adminAddress;
        diaspora = IERC20(daiAddress);
    }
    function pay (uint amount, uint paymentId) external {
        diaspora.transferFrom(msg.sender, admin,amount);
        emit paymentDone(msg.sender, amount, paymentId, block.timestamp);

    }
}