import {get, postUpload} from './services';

export const get_projects_api = async () => get('/project');

export const get_format_by_project = async (projectId) =>
  get(`/project/${projectId}/format`);


export const upload_image = async (body) => {
  return postUpload('/upload', body);
};