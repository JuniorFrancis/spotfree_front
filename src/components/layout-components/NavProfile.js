import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { AUTH_TOKEN } from 'constants/AuthConstant';

import { 
	LogoutOutlined 
} from '@ant-design/icons';
import { signOut } from 'store/slices/authSlice';

const MenuItemSignOut = (props) => (
	<span className="d-flex align-items-center">
		<LogoutOutlined className="font-size-md" />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</span>
)

export const NavProfile = () => {

	const dispatch = useDispatch();

	const handleClick = ({ key }) => {
		handleSignOut()
	}

	const handleSignOut = () => {
		localStorage.removeItem(AUTH_TOKEN);
		dispatch(signOut())
	}

	const menu = (
		<Menu
			onClick={handleClick}
			items={
				[
					{
						key: 'Sign Out',
						label: <MenuItemSignOut label="Sign Out" />,
					}
				]
			}
		/>
	) 

	return (
			<div className="nav-item">
				<div className="d-flex align-items-center">
					<Button onClick={handleClick}><MenuItemSignOut label="Sign Out" /></Button>
				</div>
			</div>
	);
}

export default NavProfile
