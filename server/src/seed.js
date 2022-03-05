import dotenv from 'dotenv/config';

import sequelize from './sequelize.js';
import { faker } from '@faker-js/faker';
import { createOrganization } from './controllers/organization-controller.js';
import {
	createApplicant,
	createOrgRepresentative,
} from './controllers/user-controller.js';

async function seed() {
	await sequelize.sync({ force: true });
	const organizations = await seedOrganization(20);
	const representatives = seedRepresentative(organizations);
	const applicants = seedApplicant(organizations);
}

async function seedOrganization(count) {
	const organizations = [];
	for (let i = 0; i < count; i++) {
		const organization = await createOrganization({
			name: faker.company.companyName(),
			address: faker.fake(
				'{{address.streetAddress}}, {{address.zipCode}}, {{address.city}}, {{address.state}}, {{address.country}}'
			),
		});
		organizations.push(organization);
	}
	return organizations;
}

async function seedRepresentative(organizations) {
	const representatives = [];

	for (let i = 0; i < organizations.length; i++) {
		const count = faker.datatype.number({ min: 2, max: 8 });

		for (let k = 0; k < count; k++) {
			const [firstName, lastName] = [
				faker.name.firstName(),
				faker.name.lastName(),
			];

			const representative = await createOrgRepresentative(
				{
					username: faker.internet.userName(firstName, lastName),
					fullname: firstName + ' ' + lastName,
					email: faker.internet.email(firstName, lastName),
					mobileNo: faker.phone.phoneNumber('+6011########'),
					jobTitle: faker.name.jobTitle(),
				},
				organizations[i].id
			);
			representatives.push(representative);
		}
	}
	return representatives;
}

async function seedApplicant(organizations) {
	const applicants = [];

	for (let i = 0; i < organizations.length; i++) {
		const count = faker.datatype.number({ min: 3, max: 8 });

		for (let k = 0; k < count; k++) {
			const [firstName, lastName] = [
				faker.name.firstName(),
				faker.name.lastName(),
			];

			const applicant = await createApplicant(
				{
					fullname: firstName + ' ' + lastName,
					IDno: faker.random.alphaNumeric(12).toUpperCase(),
					address: faker.fake(
						'{{address.secondaryAddress}}, {{address.streetAddress}}, {{address.zipCode}}, {{address.city}}, {{address.state}}, {{address.country}}'
					),
					householdIncome: faker.finance.amount(50, 1000),
				},
				organizations[i].id
			);
			applicants.push(applicant);
		}
	}
	return applicants;
}

await seed();
