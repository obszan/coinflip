// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IERC20.sol";

contract Coinflip {
    IERC20 token;

    bool public winnerA = false;
    bool public winnerB = false;

    uint256 public totalPriceA;
    uint256 public totalPriceB;

    mapping(address => uint256) public betOnA;
    mapping(address => uint256) public betOnB;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    modifier winnerDrawn() {
        require(winnerA || winnerB, "No winner has been drawn yet");
        _;
    }

    modifier coinFlipOngoing() {
        require(!winnerA && !winnerB, "Winner has not been drawn yet");
        _;
    }

    function betA(uint256 amountToBet) public coinFlipOngoing {
        token.transferFrom(msg.sender, address(this), amountToBet);
        betOnA[msg.sender] += amountToBet;
        totalPriceA += amountToBet;
    }

    function betB(uint256 amountToBet) public coinFlipOngoing {
        token.transferFrom(msg.sender, address(this), amountToBet);
        betOnB[msg.sender] += amountToBet;
        totalPriceB += amountToBet;
    }

    function drawWinner() public coinFlipOngoing {
        if (block.number % 2 == 0) {
            winnerA = true;
        } else {
            winnerB = true;
        }
    }

    function claimPrice() external winnerDrawn {
        if (winnerA) {
            require(betOnA[msg.sender] > 0, "No bets were placed");
            uint256 amountWon = (betOnA[msg.sender] / totalPriceA) *
                (totalPriceA + totalPriceB);
            token.transfer(msg.sender, amountWon);
        } else {
            require(betOnB[msg.sender] > 0, "No bets were placed");
            uint256 amountWon = (betOnB[msg.sender] / totalPriceB) *
                (totalPriceA + totalPriceB);
            token.transfer(msg.sender, amountWon);
        }
    }
}
