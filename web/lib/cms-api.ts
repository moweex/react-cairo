/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as datoCmsApi from './cms-providers/dato';

let cmsApi: typeof datoCmsApi;

if (process.env.DATOCMS_READ_ONLY_API_TOKEN) {
  cmsApi = datoCmsApi;
} else {
  cmsApi = {
    getAllSpeakers: () => Promise.resolve([]),
    getAllStages: () => Promise.resolve([]),
    getAllSponsors: () => Promise.resolve([]),
    getAllJobs: () => Promise.resolve([]),
    getSiteMode: () =>
      Promise.resolve({
        siteMode: 'seeking_speakers',
        eventName: '',
        date: '',
      }),
    getMainPageContent: () =>
      Promise.resolve({
        mainTitle: 'React Cairo',
        buttons: [],
        description: '',
        speakerSignUp: '',
        gallery: [],
        videoURL: '',
        keywords: '',
      }),
    getHeaderContent: () => Promise.resolve({ buttons: [], speakerSignUp: '' }),
    getSocialLinks: () => Promise.resolve([]),
    getAgenda: () => Promise.resolve([]),
    getMedia: () => Promise.resolve([]),
    getSponsorshipPlans: () => Promise.resolve([]),
    getMetaContent: () =>
      Promise.resolve({
        description: '',
        keywords: '',
        title: '',
      }),
    getBenefitsSection: () =>
      Promise.resolve({
        title: '',
        description: '',
        benefits: [],
        header: '',
        secondaryHeader: '',
      }),
    isRegistrationAllowed: () => Promise.resolve(false),
    getAllCommunityPartners: () => Promise.resolve([]),
  };
}

export const getAllSpeakers = cmsApi.getAllSpeakers;
export const getAllStages = cmsApi.getAllStages;
export const getAllSponsors = cmsApi.getAllSponsors;
export const getAllJobs = cmsApi.getAllJobs;
export const getSiteMode = cmsApi.getSiteMode;
export const getMainPageContent = cmsApi.getMainPageContent;
export const getHeaderContent = cmsApi.getHeaderContent;
export const getAgenda = cmsApi.getAgenda;
export const getSponsorshipPlans = cmsApi.getSponsorshipPlans;
export const isRegistrationAllowed = cmsApi.isRegistrationAllowed;
