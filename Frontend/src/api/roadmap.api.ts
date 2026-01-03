import { RoadmapFormData } from '@/types/roadmap';
import {api} from './axios'

import {updateTopicData} from '@/types/RawBackend'

export async function createRoadmapFromSkillsAPI(data :RoadmapFormData) {
    const res = await api.post('/create-from-skill',data)
    return res.data;
}

export async function getAllRoadmapsAPI() {
    const res = await api.get('/get-all-roadmaps');
    return res.data;
}

export async function updateTopicAPI
(data: updateTopicData) {
    const res = await api.post('/update-topic-data',data);
}