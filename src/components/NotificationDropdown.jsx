import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const NotificationDropdown = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle 
                id="notification-dropdown" 
                className="bg-white gainsboro-color rounded-circle p-0"
                style={{ width: "3.0rem", height: "3.0rem" }}
            >
                <div className="position-relative">
                    <Icon icon="solar:bell-linear" className="z-1" />
                    <button 
                        variant="danger" 
                        className="border-none rounded-circle position-absolute fw-semibold text-white"
                        style={{ top: "0px", right: "0px", padding: "0.2rem" }}
                    >
                        3 {/* Example notification count */}
                    </button>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>Notification 1: Your order has been shipped.</Dropdown.Item>
                <Dropdown.Item>Notification 2: New message from John.</Dropdown.Item>
                <Dropdown.Item>Notification 3: Your profile was updated successfully.</Dropdown.Item>
                <Dropdown.Item disabled>No more notifications</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationDropdown;