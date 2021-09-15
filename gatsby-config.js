/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    pages: [
      {
        title: 'Lightroom API Overview',
        path: '/'
      },
      {
        title: 'Get Started',
        path: '/getting-started/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'Code Samples',
        path: '/code-sample/'
      },
      {
        title: 'API Reference',
        path: '/api/index.md'
      },
      {
        title: 'Release Notes',
        path: '/release-notes/'
      }
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/getting-started/',
        pages: [
          {
            title: 'Create an Integration',
            path: '/getting-started/create_integration/'
          },
          {
            title: 'Services Health Check',
            path: '/getting-started/service_health_check/'
          },
          {
            title: 'Authenticate Customers',
            path: '/getting-started/authenticate_customers/'
          },
          {
            title: 'Upload Content',
            path: '/getting-started/upload_content/'
          },
          {
            title: 'Manage Content',
            path: '/getting-started/manage_content/'
          },
          {
            title: 'Read and Generate Renditions',
            path: '/getting-started/read_generate_renditions/'
          },
          {
            title: 'Developer Guidelines',
            path: '/getting-started/developer_guidelines/'
          },
          {
            title: 'Branding Guidelines',
            path: '/getting-started/branding_guidelines/'
          }
        ]
      },
      {
        title: 'Using the Lightroom APIs',
        path: '/guides/',
        pages: [
          {
            title: 'Calling a Lightroom API',
            path: '/guides/calling_api/'
          },
          {
            title: 'Primitive Data Types',
            path: '/guides/primitive_data_types/'
          },
          {
            title: 'Common Data Model',
            path: '/guides/common_data_model/'
          },
          {
            title: 'Links and Pagination',
            path: '/guides/links_and_pagination/'
          }
        ]
      },
      {
        title: 'Sample Code',
        path: '/code-sample/'
      },
      {
        title: 'API Change Logs',
        path: '/release-notes/'
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/lightroom/lightroom-api-docs/'
};
