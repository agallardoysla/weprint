import {get} from './services';

export const get_format_by_id = async (formatId) => get(`/format/${formatId}`);
