import React from 'react';
import classnames from 'classnames';
import s from './style.module.scss';
const Description = ({ className }) => (
  <div className={classnames(s.description, className)}>
        <h2>How to use Simple Salary Tax Calulator</h2>
        <br/>
        <p>
            Using Simple Salary is easier then ever, input your salary, choose how often you get paid your salary and hit Enter! There are also a selection of additional 
          options you can choose to calculate your take home pay.
        </p>
        <br/>
        <p>
            You have the option of choosing if you want to enter your salary Per Year, Month, Week or Day. Please note that when selecting Per Day, we a calculating under the assumption that there are 
            260 working days in the year.
        </p>
        <br/>
        <p>
            If your Pension Contributions are automatically deducted form your payslip, you can enter the percentage rate that it is being deducted at. Percentage deductions are take from the 
          gross salary (Before any tax is is deducted)
        </p>
        <br/>
        <p>
            If you are repaying your Student Load, then you have the option to select which plan you are on. Plan 1 is if you began your studies before 1st September 2012. Plan 2 is if
          you started after 1st September 2012. Simply select which plan you are on and the deductions will be calculated. For both Plan 1 and 2, 9% of the amount you earn above the threshold 
          is how much is taken from your pay. If you earn below the threshold then no amount is deducted. Threshold for current year are Plan1:{} Plan2:{}. These deductions are based on gross 
          pay (Before any tax is deducted)
        </p>
        <p>
            Checking how much you would have earned in previous years can be done simply by selecting the tax year from the drop down and pressing calculate.   
        </p>
        <br/>
        <p>Please remember that the tax year runs from beginning of April to the End of April.</p>
        <br/>
        <p>
            Disclaimer: Information provided on this site is for illustrative purposes only and accuracy cannot 100% be guarenteed. Please do not make any major financial decisions
             without consulting a qualified specialist.
        </p>
  </div>
);

export default Description;
