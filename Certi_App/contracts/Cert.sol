// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract CertiApp {
    
    struct Student{
        string name;
        string course;
        string grade;
        string date;
    }
    address admin;

    event issued(uint , string, string, string, string);

    constructor() {
        admin = msg.sender;
    }

    modifier verify(){
        require(msg.sender == admin,"Unotherized access");
        _;
    }

    mapping (uint256 => Student) public Certificates;

    function issue(uint256 _id,string memory _name,string memory _course,string memory _grade,string memory _date) public verify{
        //   require(bytes(Certificates[_id].name).length == 0, "Certificate already exists");
        Certificates[_id] = Student(_name,_course,_grade,_date);
        emit issued(_id, _name, _course, _grade, _date);
    }


}