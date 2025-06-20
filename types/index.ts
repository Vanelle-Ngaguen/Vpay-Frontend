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
	expiry_date: string;
}
