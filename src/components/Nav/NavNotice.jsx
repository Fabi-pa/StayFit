import React from 'react'

function NavNotice() {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-bell"></i>
          <span className="badge bg-primary badge-number">4</span>
        </a>
  
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
          <li className="dropdown-header">
            You have 4 new notifications
            <a href="#">
              <span className="badge rounded-pill bg-primary p-2 ms-2">
                View all
              </span>
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
  
          <li className="notification-item">
            <i className="bi bi-exclamation-circle text-warning"></i>
            <div>
              <h4>Restart</h4>
              <p>Restart the application in the near future for the updates</p>
              <p>30 min. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
  
          <li className="notification-item">
            <i className="bi bi-x-circle text-danger"></i> 
            <div>
              <h4>Incident in testing</h4>
              <p>Problem at testing the next update for next week</p>
              <p>1 hr. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
  
          <li className="notification-item">
            <i className="bi bi-check-circle text-success"></i>
            <div>
              <h4>Testing completed</h4>
              <p>newest update was tested</p>
              <p>2 hrs. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
  
          <li className="notification-item">
            <i className="bi bi-info-circle text-primary"></i>
            <div>
              <h4>New Update</h4>
              <p>update for user filter</p>
              <p>4 hrs. ago</p>
            </div>
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
  
  export default NavNotice;
