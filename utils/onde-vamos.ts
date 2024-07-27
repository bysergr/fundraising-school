import Typesense from 'typesense';
import type { ConfigurationOptions } from 'typesense/lib/Typesense/Configuration';
import TypesenseInstantSearchAdapterExport, {
    type TypesenseInstantsearchAdapterOptions,
} from 'typesense-instantsearch-adapter';
// There is an issue with this being compatible with vite
// https://github.com/typesense/typesense-instantsearch-adapter/issues/199
export const TypesenseInstantSearchAdapter =
    TypesenseInstantSearchAdapterExport.default ?? TypesenseInstantSearchAdapterExport;

const ONDE_VAMOS_API_KEY = 'lasnf791hp3;iuTotallySafebnposcb-v97xoiusf';
const ONDE_VAMOS_HOST =
    process.env.NODE_ENV === 'production' ? 'api.onde-vamos.com' : 'api.dev.onde-vamos.com';

if (
    !ONDE_VAMOS_API_KEY ||
    ONDE_VAMOS_API_KEY === '' ||
    !ONDE_VAMOS_HOST ||
    ONDE_VAMOS_HOST === ''
) {
    throw new Error('Missing required environment variables for Typesense');
}

export const OndeSearchConfig = {
    apiKey: ONDE_VAMOS_API_KEY,
    nodes: [
        {
            host: ONDE_VAMOS_HOST,
            port: 443,
            protocol: 'https',
        },
    ],
} satisfies ConfigurationOptions;

const TypesenseAdapterOptions = {
    server: OndeSearchConfig,
    // The following parameters are directly passed to Onde's search API endpoint.
    // So you can pass any parameters supported by the search endpoint below.
    // queryBy is required.
    additionalSearchParameters: {
        query_by: 'title,host,description',
        query_by_weights: 'title:3,host:2,description:1',
        sort_by: '_text_match:desc',
        exclude_fields: 'embedding',
        num_typos: 2,
        prefix: true,
    },
    // additionalSearchParameters: {
    //     query_by: 'embedding,title,description',
    //     vector_query: 'embedding:([], alpha: 0.8)',
    //     sort_by: '_text_match:desc',
    //     exclude_fields: 'embedding,description',
    //     prefix: false,
    // },
} satisfies TypesenseInstantsearchAdapterOptions;

export const client = new Typesense.Client(OndeSearchConfig);
export const getTypesenseAdapter = () => new TypesenseInstantSearchAdapter(TypesenseAdapterOptions);
