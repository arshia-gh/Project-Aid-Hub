import { useQuery } from 'react-query';
import {
	getAppealById,
	getAppealDisbursements,
	getAppeals,
	getApplicant,
	getApplicantDisbursements,
	getApplicantDocuments,
	getAvailableApplicants,
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

export const useAppealDisbursementsQuery = (appealId) =>
	useQuery(
		['disbursements', appealId],
		() => getAppealDisbursements(appealId),
		{
			select: selectResult,
		}
	);

export const useContributionsQuery = (appealId) =>
	useQuery(['contributions', appealId], () => getContributions(appealId), {
		select: selectResult,
	});

export const useApplicantQuery = (IDno) =>
	useQuery(['applicant', IDno], () => getApplicant(IDno), {
		select: selectResult,
	});

export const useAvailableApplicantsQuery = (appealId) =>
	useQuery(['available', appealId], () => getAvailableApplicants(appealId), {
		select: selectResult,
	});

export const useApplicantDocumentsQuery = (IDno) =>
	useQuery(['documents', IDno], () => getApplicantDocuments(IDno), {
		select: selectResult,
	});

export const useApplicantDisbursements = (IDno) =>
	useQuery(['disbursements', IDno], () => getApplicantDisbursements(IDno), {
		select: selectResult,
	});
