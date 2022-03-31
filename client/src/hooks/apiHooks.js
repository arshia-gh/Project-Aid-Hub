import { useQuery } from 'react-query';
import {
	getAppealById,
	getAppeals,
	getContributions,
	getOrganization,
	getOrganizations,
	getOrgAppeals,
	getOrgApplicants,
	getRepresentatives,
} from 'api/axios';

const selectResult = (response) => response.data.result;

export const useOrganizationQuery = (orgId) =>
	useQuery(['organization', orgId], () => getOrganization(orgId), {
		select: selectResult,
	});

export const useOrgApplicantsQuery = (orgId) =>
	useQuery(['applicants', orgId], () => getOrgApplicants(orgId), {
		select: selectResult,
	});

export const useOrganizationsQuery = () =>
	useQuery('organizations', getOrganizations, {
		select: selectResult,
	});

export const useRepresentativesQuery = (orgId) =>
	useQuery(['representatives', orgId], () => getRepresentatives(orgId), {
		select: selectResult,
	});

export const useOrgAppealsQuery = (orgId) =>
	useQuery(['appeals', orgId], () => getOrgAppeals(orgId), {
		select: selectResult,
	});

export const useAppealsQuery = () =>
	useQuery('appeals', getAppeals, {
		select: selectResult,
	});

export const useAppealQuery = (appealId) =>
	useQuery(['appeal', appealId], () => getAppealById(appealId), {
		select: selectResult,
	});

export const useContributionsQuery = (appealId) =>
	useQuery(['goods', appealId], () => getContributions(appealId), {
		select: selectResult,
	});
