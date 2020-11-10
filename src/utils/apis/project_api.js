import {get, postUpload, postUploadImage} from './services';

export const get_projects_api = async () => get('/project');

export const get_format_by_project = async (projectId) =>
  get(`/project/${projectId}/format`);

export const upload_image = async (file, repoName) => {
  return postUpload('/upload', file, repoName);
};

export const upload_image_uri = async (body, repoName) => {
  return postUploadImage('/upload', body, repoName);
};
