import {post, get} from './services';

export const create_repository = async (body) => {
    return post('/repository', body);
};
  
export const get_repositories = async () => {
    return get('/repository');
};
  