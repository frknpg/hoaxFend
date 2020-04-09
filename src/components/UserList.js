import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgressHook';
import Spinner from './Spinner';

const UserList = (props) => {

	const [page, setPage] = useState({
		content: [],
		size: 3,
		number: 0
	});
	const [failure, setFailure] = useState(false);
	const pendingApiCall = useApiProgress('/api/1.0/users');

	useEffect(() => {
		getUserList();
	}, []);

	const getUserList = async (size, number) => {
		setFailure(false);
		try {
			const response = await getUsers(size, number);
			setPage(response.data);
		} catch (err) { 
			setFailure(true);
		}
	}

	const onClickNext = () => {
		const nextPage = page.number + 1;
		getUserList(nextPage);
	}

	const onClickPrev = () => {
		const prevPage = page.number - 1;
		getUserList(prevPage);
	}

	const { t } = useTranslation();
	const { content: users, last, first } = page;

	let actionDiv = (
		<div>
			{first === false && <button className="btn btn-sm btn-light float-left" onClick={onClickPrev}>{t('Prev')}</button>}
			{last === false && <button className="btn btn-sm btn-light float-right" onClick={onClickNext}>{t('Next')}</button>}
		</div>
	);

	if (pendingApiCall) {
		actionDiv = <Spinner />
	}

	return (
		<div className="card">
			<h3 className="card-header text-center">{t('Users')}</h3>
			<div className="list-group-flush">
				{users.map((user) => (
					<UserListItem key={user.usernam} user={user} />
				))}
			</div>
			{actionDiv}
			{failure && <div className="text-center text-danger">{t("Load Failure")}</div>}
		</div>
	);
};

export default UserList;