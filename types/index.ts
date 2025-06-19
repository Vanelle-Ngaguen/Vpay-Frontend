export interface Model {
	id: string;
	created_at: string;
	updated_at: string;
}

export interface Card extends Model {
	number: number;
	holder_name: string;
	issuer: string;
	expiry_date: string;
}
