import { useQuery } from 'react-query';
import { getOrgAppeals, getOrgApplicants } from 'api/axios';

const selectResult = (response) => response.data.result;

export const useOrgApplicantsQuery = (orgId) =>
	useQuery(['applicants', orgId], () => getOrgApplicants(orgId), {
		select: selectResult,
	});

export const useOrgAppealsQuery = (orgId) =>
	useQuery(['appeals', orgId], () => getOrgAppeals(orgId), {
		select: selectResult,
	});
