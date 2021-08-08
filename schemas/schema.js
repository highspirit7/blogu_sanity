// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// import break from './break';
import category from './category';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'blogu_schema',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		/* Your types here! */
		category,
		{
			name: 'blog',
			type: 'document',
			title: 'Blog',
			fields: [
				{
					name: 'title',
					type: 'string',
					title: 'Title',
					validation: (Rule) => Rule.required().min(8).max(64),
				},
				{
					name: 'subtitle',
					type: 'string',
					title: 'Subtitle',
				},
				{
					name: 'coverImage',
					title: 'Cover Image',
					type: 'image',
					options: {
						hotspot: true,
					},
					fields: [
						{
							type: 'text',
							name: 'alt',
							title: 'Description',
						},
					],
				},
				{
					name: 'content',
					title: 'Content',
					type: 'array',
					of: [
						{
							name: 'break',
							type: 'object',
							title: 'Break',
							fields: [
								{
									name: 'style',
									type: 'string',
									options: {
										list: ['break'],
									},
								},
							],
						},
						{
							type: 'block',
							marks: {
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'Link',
										fields: [
											{
												name: 'href',
												type: 'url',
												title: 'URL',
											},
											{
												title: 'Open in new tab',
												name: 'blank',
												description: 'Read https://css-tricks.com/use-target_blank/',
												type: 'boolean',
											},
										],
									},
								],
							},
						},
						{
							type: 'image',
							fields: [
								{
									title: 'Position',
									name: 'position',
									type: 'string',
									options: {
										list: [
											{ title: 'Center', value: 'center' },
											{ title: 'Left', value: 'left' },
											{ title: 'Right', value: 'right' },
										],
										layout: 'radio',
										isHighlighted: true,
									},
								},
								{
									type: 'text',
									name: 'alt',
									title: 'Description',
									options: {
										isHighlighted: true,
									},
								},
							],
							options: {
								hotspot: true,
							},
						},
						{
							type: 'code',
						},
					],
				},
				{
					name: 'date',
					title: 'Date',
					type: 'datetime',
					validation: (Rule) => Rule.required(),
				},
				{
					name: 'category',
					title: 'Category',
					type: 'reference',
					to: [{ type: 'category' }],
					validation: (Rule) => Rule.required(),
				},
				{
					name: 'slug',
					type: 'slug',
					title: 'Slug',
					validation: (Rule) => Rule.required(),
					options: {
						source: 'title',
						slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
					},
				},
			],
		},
	]),
});
