import React, { useEffect } from 'react';
import '../styles/App.css';

function Boiler() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="bolierPlate">
        <div className="line_1">
          <a href="#KnowMore">Know more</a>
          <a href="#signUP">Join Us</a>
          <a href="/LogIN">Log In</a>
          <a href="#testDiv">Report</a>
        </div>
        <div className="lower_content">
          <div className="u_line_1 s_snap">
            <div className="name_ewe hidden">Blog IT</div>
            <div className="logo_ewe"></div>
          </div>
          <div className='u_line_2 s_snap'>
             <div className='caption hidden'>"Unleash your thoughts, blog IT all!"</div>
          </div>
          <div id='signUP' className='u_line_3 s_snap'>
              <div className='sUp_img'></div>
              <div className='button_to_go '>
                <a href='/signUp'>
                  <div className='goto_sign_up '>
                    <p className='hidden'> Get Started  <i className="fa-solid fa-wifi fa-rotate-90"></i></p>
                  </div>
                </a>
                <div className='vlnsv'>Register to join</div>
              </div>
              
          </div>
          <div id='KnowMore' className='u_line_4 s_snap'>
              <div className='cont_supf hidden'>
                <li>Home Page</li>
              </div>
              <div className='img_787_home_pc img_pc_dim'></div>
          </div>
          <div className='u_line_4 s_snap'>
              <div className='cont_supf hidden'>
                <li>Home Page Mobile</li>
                <p>Top left icon consist of suggestions and friend list</p>
              </div>
              <div className='img_mob_dim'></div>
          </div>
          <div className='u_line_4 s_snap'>
          <div className='img_787_prf_pc img_pc_dim'></div>
              <div className='cont_supf hidden'>
                <li>Profile Page</li>
              </div>
          </div>
          <div className='u_line_4 s_snap'>
              <div className='cont_supf hidden'>
                <li>Posting</li>
                <p>You can add image to your Blog</p>
                <p className='red_alx'>Not ready on server, free  server will not store images for long time, better not to add image Currently</p>
              </div>
              <div className='img_787_post_pc img_pc_dim'></div>
          </div>
          <div className='u_line_4 s_snap'>
          <div className='img_787_edit_pc img_pc_dim'></div>
              <div className='cont_supf hidden'>
                <li>Editor</li>
                <p>
                  " Here you can edit your information "
                </p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Boiler;
