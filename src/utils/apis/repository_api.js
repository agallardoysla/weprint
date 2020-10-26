import {post, get, del} from './services';

export const create_repository = async (body) => post('/repository', body);

export const get_repositories = async () => {
  return get('/repository');
};
 
export const get_pieces_from_repository = async (repoId) => {
    return get(`/repository/${repoId}/pieces`);
};

export const delete_repository = async (repoId) => {
    return del(`/repository/${repoId}`);
};

export const post_repository_request = async (body) => {
    return post('/repository-shared', body)
}    

export const get_repository_request = async () => {
    return get('/repository-shared')
}

export const accept_repository_request = async (body) => {
    return post('/repository-shared/accepted', body)
}
