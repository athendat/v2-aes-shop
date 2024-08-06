
export type Attribute = {
    id: string;
    name: string;
    slug: string;
    status: boolean;
    style: string;
    attribute_values: AttributeValue[];
    created_by_id: string;
}

export type AttributeValue = {
    id: string;
    name: string;
    value: string;
    slug: string;
    status: boolean;
    hex_color: string;
    attribute_id: string;
    created_by_id?: string;
}
