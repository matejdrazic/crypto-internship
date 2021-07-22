const { assert } = require('chai');
require('chai').use(require('chai-as-promised')).should();

const CoinFactory = artifacts.require('CoinFactory');
const ERC20 = artifacts.require('ERC20');

contract('CoinFactory', ([deployer, add2, add3]) => {
    let cf;

    before(async () => {
        cf = await CoinFactory.new();
    })

    describe('Testing CoinFactory.sol functions', async () => {
        it('createERC20Token', async function () {
            const addressToken = await cf.createERC20Token('MatejToken', 'MT', 100000, deployer)
            const addressToken2 = await cf.createERC20Token('LucijaToken', 'LT', 100000, add2)
            const addressToken3 = await cf.createERC20Token('IvaToken', 'IT', 100000, add3)

            const numOfTokens = await cf.numberOfTokens()
            const names = await cf.getNames()

            assert.equal(numOfTokens, 3)
            assert.equal(names[0], 'MatejToken')
            assert.equal(names[1], 'LucijaToken')
            assert.equal(names[2], 'IvaToken')

        })
    })
})

contract('ERC20', ([deployer, add2, add3]) => {
    let erc;

    before(async () => {
        erc = await ERC20.new('MatejToken', 'MT', 100000, deployer);
    })

    describe('Testing ERC20.sol functions', async () => {
        it('mint', async function () {
            await erc.mint(deployer, '10000')
            const tokenAmount = await erc.balanceOf(deployer)
            assert.equal(tokenAmount.toString(), '110000')
        })

        it('burn', async function () {
            await erc.burn(deployer, '10000')
            const tokenAmount = await erc.balanceOf(deployer)
            assert.equal(tokenAmount.toString(), '100000')
        })

        it('approve', async function () {
            await erc.approve(add2, '10000')
            const tokenAmount = await erc.allowance(deployer, add2)
            assert.equal(tokenAmount.toString(), '10000')
        })

        it('transferFrom', async function () {
            await erc.transferFrom(deployer, add2, '10000')
            const tokenAmount = await erc.balanceOf(add2)
            assert.equal(tokenAmount.toString(), '10000')
        })

        it('transfer', async function () {
            await erc.transfer(add3, '10000')
            let tokenAmount = await erc.balanceOf(add3)
            assert.equal(tokenAmount.toString(), '10000')
        })

        it('mint - but not the token creator', async function () {

            const ERROR = "Returned error: VM Exception while processing transaction: revert Not allowed! -- Reason given: Not allowed!."
            try {
                await erc.mint(deployer, '10000', { from: add2 })
            } catch (err) {
                assert.equal(err.message, ERROR)
            }
        })
    })
})
