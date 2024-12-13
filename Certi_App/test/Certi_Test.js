const { expect } = require('chai')
const { ethers } = require('hardhat')
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');

describe('Cert', function () {
    async function deployContract() {
        const [admin, other] = await ethers.getSigners(); // aa particular networlile open accounts kittan
        const Cert = await ethers.getContractFactory('CertiApp'); //get instance of our contract getContreactFactory()
        const contractAddress = await Cert.deploy(); // it deploy the instance and return a contract address
        return {  contractAddress ,admin, other}
    }
    it("should be deploy only by admin!", async function () {
        const { contractAddress,admin} = await loadFixture(deployContract);
        console.log(admin.address);
        expect(contractAddress.deploymentTransaction().from).to.equals(admin.address);//this expect check that, the deploymentTransaction aaranu deployee cheithathu ennulla data from vazhi tharunnu. to.equal is a function to compare the admin address and the from address aare eqaul aano ennanu

    })

    it("Able to issue and read certificate",async function(){
        const {contractAddress,admin} = await loadFixture(deployContract);
        await contractAddress.issue(1,"sumi","CBA","A","12/12/2024");
        const Certi = await contractAddress.Certificates(1);
        // console.log(Certi);
        expect(Certi[0]).to.equals("sumi");
        
    })
    it("only the admin can issue the certificate",async function(){
        const {contractAddress,other} = await loadFixture(deployContract);
        await expect(contractAddress.connect(other).issue(2,"Arya","Cd","S","12/12/2024")).to.be.revertedWith("Unotherized access");

    })

})