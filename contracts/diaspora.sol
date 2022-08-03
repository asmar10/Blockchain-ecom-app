pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract diaspora is ERC20 {
    constructor() ERC20('Diaspora','DSPO') public {}
        function faucet(address to, uint amount) external {
            _mint(to, "200000000");
        }
    
}