const { assert } = require('chai');
require('chai').use(require('chai-as-promised')).should();

const CoinFactory = artifacts.require('CoinFactory');
const Token = artifacts.require('Token');

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('CoinFactory', ([deployer]) => {
    let cf;

    before(async () => {
        cf = await CoinFactory.new();
    })

    describe('Testing CoinFactory.sol functions', async () => {
        it('createERC20Token', async function () {
            const addressToken = await cf.createERC20Token('MatejToken', 'MT')
            const addressToken2 = await cf.createERC20Token('LucijaToken', 'LT')
            const addressToken3 = await cf.createERC20Token('IvaToken', 'IT')

            const numOfTokens = await cf.numberOfTokens()
            const names = await cf.getNames()

            assert.equal(numOfTokens, 3)
            assert.equal(names[0], 'MatejToken')
            assert.equal(names[1], 'LucijaToken')
            assert.equal(names[2], 'IvaToken')

        })
    })
})

contract('Token -> ERC20', ([deployer, add2, add3]) => {
    let erc;

    before(async () => {
        erc = await Token.new('MatejToken', 'MT');
    })

    describe('Testing ERC20.sol functions', async () => {
        it('mint', async function () {
            await erc._mint(deployer, tokens('10000'))
            const tokenAmount = await erc.balanceOf(deployer)
            assert.equal(tokenAmount.toString(), tokens('110000'))
        })

        it('burn', async function () {
            await erc._burn(deployer, tokens('10000'))
            const tokenAmount = await erc.balanceOf(deployer)
            assert.equal(tokenAmount.toString(), tokens('100000'))
        })

        it('approve', async function () {
            await erc.approve(add2, tokens('10000'))
            const tokenAmount = await erc.allowance(deployer, add2)
            assert.equal(tokenAmount.toString(), tokens('10000'))
        })

        it('transferFrom', async function () {
            await erc.transferFrom(deployer, add2, tokens('10000'), {from: add2})
            const tokenAmount = await erc.balanceOf(add2)
            assert.equal(tokenAmount.toString(), tokens('10000'))
        })

        it('transfer', async function () {
            await erc.transfer(add3, tokens('10000'))
            let tokenAmount = await erc.balanceOf(add3)
            assert.equal(tokenAmount.toString(), tokens('10000'))
        })
        
    })
})