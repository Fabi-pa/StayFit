import React from 'react'

function NavMessage() {
    return (
        <li className="nav-item dropdown">
          <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-chat-left-text"></i>
            <span className="badge bg-success badge-number">3</span>
          </a>
    
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
            <li className="dropdown-header">
              You have 3 new messages
              <a href="#">
                <span className="badge rounded-pill bg-primary p-2 ms-2">
                  View all
                </span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
    
            <li className="message-item">
              <a href="#">
                <img
                src='assets/img/messages-1.jpg'
                alt=''
                className='rounded-circle'
                />
              <div>
                <h4>Jeremy May</h4>
                <p>Can you check the newest update which i uploaded to the project, please?</p>
                <p>2 hrs. ago</p>
              </div>
            </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
    
                <li className="message-item">
                    <a href="#">
                    <img
                    src='assets/img/messages-2.jpg' 
                    alt=''
                    className='rounded-circle'
                    />
              <div>
                <h4>Lando Piastri</h4>
                <p>I think there is a problem in our test environment!</p>
                <p>4 min. ago</p>
              </div>
            </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
    
            <li className="message-item">
              <a href="#">
                <img
                src='assets/img/messages-1.jpg'
                alt=''
                className='rounded-circle'
                />
              <div>
                <h4>Zak Brown</h4>
                <p>Please change your password in the near future, thanks</p>
                <p>14 min. ago</p>
              </div>
            </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li className="dropdown-footer">
              <a href="#">show all notifications</a>
            </li>
          </ul>
        </li>
      );
    }

export default NavMessage;
