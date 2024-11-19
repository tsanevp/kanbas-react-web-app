import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollment`;

export const deleteEnrollment = async (courseId: string) => {
    const response = await axiosWithCredentials.delete(`${ENROLLMENT_API}/${courseId}`);
    return response.data;
};

export const createEnrollment = async (courseId: any) => {
    const { data } = await axiosWithCredentials.post(`${ENROLLMENT_API}/${courseId}`);
    return data;
};

export const getAllEnrollmentsForCourse = async (courseId: any) => {
    const { data } = await axiosWithCredentials.get(`${ENROLLMENT_API}/${courseId}`);
    return data;
};