export interface Model {
	id: string;
	created_at: string;
	updated_at: string;
}

export interface Card extends Model {
	number: string;
	holder_name: string;
	balance: number;
	issuer: string;
	cvv: number;
	expiry_date: string;
}

export interface User extends Model {
	name: string;
	username: string;
	email: string;
	phone: string;
	email_verified_at: string | null;
	kyc:
		| (Model & {
				client_id: User["id"];
				approved: boolean;
		  })
		| null;
}
