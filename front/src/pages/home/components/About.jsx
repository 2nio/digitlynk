import React from 'react'

import './About.css'

import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";


function About() {
  return (
    <div className='About_div_main'>
        <p className='About_p'>We build software that meet your needs</p>
        <div className='About_div_second'>
            <div className='About_div_industries'>
                <h2>INDUSTRIES</h2>
                <div className='About_div_uls'>
                    <ul>
                        <li><div className='About_div_industry'>Manufacturing</div></li>
                        <li><div className='About_div_industry'>Logistics</div></li>
                        <li><div className='About_div_industry'>Transportation</div></li>
                        <li><div className='About_div_industry'>Healthcare</div></li>
                        <li><div className='About_div_industry'>Energy</div></li>
                    </ul>
                    <ul>
                        <li><div className='About_div_industry'>Banking</div></li>
                        <li><div className='About_div_industry'>Retail</div></li>
                        <li><div className='About_div_industry'>Services</div></li>
                        <li><div className='About_div_industry'>Finance</div></li>
                        <li><div className='About_div_industry'>Construction</div></li>
                    </ul>
                </div>
            </div>
            <div className='About_div_industries About_div_solutions'>
                <h2>SOLUTIONS</h2>
                <div className='About_div_uls'>
                    <ul>
                        <li><div className='About_div_industry'>CMS</div></li>
                        <li><div className='About_div_industry'>CRM</div></li>
                        <li><div className='About_div_industry'>ERP</div></li>
                        <li><div className='About_div_industry'>Project Management</div></li>
                        <li><div className='About_div_industry'>HR Tools</div></li>
                    </ul>
                    <ul>
                        <li><div className='About_div_industry'>Billing</div></li>
                        <li><div className='About_div_industry'>Colaboration tools</div></li>
                        <li><div className='About_div_industry'>Dashboards</div></li>
                        <li><div className='About_div_industry'>Analytics</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About