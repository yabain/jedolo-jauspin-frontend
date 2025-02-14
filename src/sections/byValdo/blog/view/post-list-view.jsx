import orderBy from 'lodash/orderBy';
import { useState, useCallback, useEffect, useMemo } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { useGetPosts, useSearchPosts } from 'src/api/blog';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostSort from '../post-sort';
import PostSearch from '../post-search';
import PostListHorizontal from '../post-list-horizontal';
import PostList from '../post-list';
import TourFilters from '../tour-filters';

// ----------------------------------------------------------------------



const defaultFilters = {
       publish: 'all',
};

// ----------------------------------------------------------------------

export default function PostListView()
{


       const openFilters = useBoolean();

       const settings = useSettingsContext();

       const [ sortBy, setSortBy ] = useState( 'latest' );

       const [ filters, setFilters ] = useState( defaultFilters );
       const [ selectedTab, setSelectedTab ] = useState( 'all' );

       const [ searchQuery, setSearchQuery ] = useState( '' );

       const debouncedQuery = useDebounce( searchQuery );

       const { postsLoading } = useGetPosts();

       const posts = useMemo( () =>
       (
              [

                     {
                            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                            "publish": "published",
                            "categorie": "categorie2",
                            "price": "2500",
                            "profile": "VIP",
                            "metaKeywords": [
                                   "Fitness",
                                   "Nature",
                                   "Business"
                            ],
                            "content": "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
                            "comments": [
                                   {
                                          "id": "b353aca8-352b-4755-a88d-2e6959eb24ce",
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
                                          "message": "She eagerly opened the gift, her eyes sparkling with excitement.",
                                          "postedAt": "2025-01-21T13:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "name": "Jayvion Simon",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "name": "Lucian Obrien",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "name": "Deja Brady",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "9daf4e57-df8a-402a-a362-8fca7fac4488",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "message": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
                                                        "postedAt": "2025-01-20T12:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "8496c5bd-a47e-4c45-a78a-441607011a11",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "message": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
                                                        "tagUser": "Lucian Obrien",
                                                        "postedAt": "2025-01-19T11:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "326ff38c-3df1-4102-8238-88d85bf2f33d",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "message": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
                                                        "postedAt": "2025-01-18T10:54:57.988Z"
                                                 }
                                          ]
                                   },
                                   {
                                          "id": "206bab86-4b59-456e-a0c6-2bb7f4500874",
                                          "name": "Reece Chung",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
                                          "message": "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
                                          "postedAt": "2025-01-17T09:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                                        "name": "Lainey Davidson",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                                        "name": "Cristopher Cardenas",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                                        "name": "Melanie Noble",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "1dfde117-5005-45a6-a2c5-31ceab23bba1",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                                        "message": "The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.",
                                                        "postedAt": "2025-01-16T08:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "7955c5a0-a080-43a3-88d9-525bafa8c7ec",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                                        "message": "The waves crashed against the shore, creating a soothing symphony of sound.",
                                                        "postedAt": "2025-01-15T07:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "c0b810c1-f366-4fa2-91d3-b117fc3c3c77",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                                        "message": "The scent of blooming flowers wafted through the garden, creating a fragrant paradise.",
                                                        "postedAt": "2025-01-14T06:54:57.988Z"
                                                 }
                                          ]
                                   },
                                   {
                                          "id": "0b16f8a7-0df3-4414-a5f4-99f5343a1dd9",
                                          "name": "Chase Day",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
                                          "message": "She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.",
                                          "postedAt": "2025-01-13T05:54:57.988Z",
                                          "users": [],
                                          "replyComment": []
                                   },
                                   {
                                          "id": "b2419a3d-fc8b-4c25-befe-3363a009b371",
                                          "name": "Shawn Manning",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg",
                                          "message": "The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.",
                                          "postedAt": "2025-01-12T04:54:57.988Z",
                                          "users": [],
                                          "replyComment": []
                                   }
                            ],
                            "tags": [
                                   "Technology",
                                   "Marketing",
                                   "Design",
                                   "Photography",
                                   "Art"
                            ],
                            "metaTitle": "Minimal UI Kit",
                            "createdAt": "2025-01-21T13:54:57.989Z",
                            "title": "The Ultimate Guide to Productivity Hacks",
                            "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg",
                            "totalViews": 1947,
                            "totalShares": 6984,
                            "totalComments": 9124,
                            "totalFavorites": 8488,
                            "metaDescription": "The starting point for your next project with Minimal UI Kit",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
                            "author": {
                                   "name": "Lucian Obrien",
                                   "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                            },
                            "favoritePerson": [
                                   {
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                   },
                                   {
                                          "name": "Lucian Obrien",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                   },
                                   {
                                          "name": "Deja Brady",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                   },
                                   {
                                          "name": "Harrison Stein",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg"
                                   },
                                   {
                                          "name": "Reece Chung",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg"
                                   },
                                   {
                                          "name": "Lainey Davidson",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                   },
                                   {
                                          "name": "Cristopher Cardenas",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                   },
                                   {
                                          "name": "Melanie Noble",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                   },
                                   {
                                          "name": "Chase Day",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg"
                                   },
                                   {
                                          "name": "Shawn Manning",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg"
                                   },
                                   {
                                          "name": "Soren Durham",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg"
                                   },
                                   {
                                          "name": "Cortez Herring",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg"
                                   },
                                   {
                                          "name": "Brycen Jimenez",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_13.jpg"
                                   },
                                   {
                                          "name": "Giana Brandt",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_14.jpg"
                                   },
                                   {
                                          "name": "Aspen Schmitt",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_15.jpg"
                                   },
                                   {
                                          "name": "Colten Aguilar",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_16.jpg"
                                   },
                                   {
                                          "name": "Angelique Morse",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg"
                                   },
                                   {
                                          "name": "Selina Boyer",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_18.jpg"
                                   },
                                   {
                                          "name": "Lawson Bass",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_19.jpg"
                                   },
                                   {
                                          "name": "Ariana Lang",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_20.jpg"
                                   }
                            ]
                     },
                     {
                            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                            "publish": "published",
                            "categorie": "categorie3",
                            "price": "5000",
                            "profile": "Standard",
                            "metaKeywords": [
                                   "Fitness",
                                   "Nature",
                                   "Business"
                            ],
                            "content": "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
                            "comments": [
                                   {
                                          "id": "b353aca8-352b-4755-a88d-2e6959eb24ce",
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
                                          "message": "She eagerly opened the gift, her eyes sparkling with excitement.",
                                          "postedAt": "2025-01-21T13:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "name": "Jayvion Simon",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "name": "Lucian Obrien",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "name": "Deja Brady",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "9daf4e57-df8a-402a-a362-8fca7fac4488",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "message": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
                                                        "postedAt": "2025-01-20T12:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "8496c5bd-a47e-4c45-a78a-441607011a11",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "message": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
                                                        "tagUser": "Lucian Obrien",
                                                        "postedAt": "2025-01-19T11:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "326ff38c-3df1-4102-8238-88d85bf2f33d",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "message": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
                                                        "postedAt": "2025-01-18T10:54:57.988Z"
                                                 }
                                          ]
                                   },
                                   {
                                          "id": "206bab86-4b59-456e-a0c6-2bb7f4500874",
                                          "name": "Reece Chung",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
                                          "message": "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
                                          "postedAt": "2025-01-17T09:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                                        "name": "Lainey Davidson",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                                        "name": "Cristopher Cardenas",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                                        "name": "Melanie Noble",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "1dfde117-5005-45a6-a2c5-31ceab23bba1",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                                        "message": "The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.",
                                                        "postedAt": "2025-01-16T08:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "7955c5a0-a080-43a3-88d9-525bafa8c7ec",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                                        "message": "The waves crashed against the shore, creating a soothing symphony of sound.",
                                                        "postedAt": "2025-01-15T07:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "c0b810c1-f366-4fa2-91d3-b117fc3c3c77",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                                        "message": "The scent of blooming flowers wafted through the garden, creating a fragrant paradise.",
                                                        "postedAt": "2025-01-14T06:54:57.988Z"
                                                 }
                                          ]
                                   },
                                   {
                                          "id": "0b16f8a7-0df3-4414-a5f4-99f5343a1dd9",
                                          "name": "Chase Day",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
                                          "message": "She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.",
                                          "postedAt": "2025-01-13T05:54:57.988Z",
                                          "users": [],
                                          "replyComment": []
                                   },
                                   {
                                          "id": "b2419a3d-fc8b-4c25-befe-3363a009b371",
                                          "name": "Shawn Manning",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg",
                                          "message": "The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.",
                                          "postedAt": "2025-01-12T04:54:57.988Z",
                                          "users": [],
                                          "replyComment": []
                                   }
                            ],
                            "tags": [
                                   "Technology",
                                   "Marketing",
                                   "Design",
                                   "Photography",
                                   "Art"
                            ],
                            "metaTitle": "Minimal UI Kit",
                            "createdAt": "2025-01-20T12:54:57.989Z",
                            "title": "Exploring the Hidden Gems of [Destination]",
                            "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg",
                            "totalViews": 9124,
                            "totalShares": 8488,
                            "totalComments": 6984,
                            "totalFavorites": 2034,
                            "metaDescription": "The starting point for your next project with Minimal UI Kit",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
                            "author": {
                                   "name": "Deja Brady",
                                   "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                            },
                            "favoritePerson": [
                                   {
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                   },
                                   {
                                          "name": "Lucian Obrien",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                   },
                                   {
                                          "name": "Deja Brady",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                   },
                                   {
                                          "name": "Harrison Stein",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg"
                                   },
                                   {
                                          "name": "Reece Chung",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg"
                                   },
                                   {
                                          "name": "Lainey Davidson",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                   },
                                   {
                                          "name": "Cristopher Cardenas",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                   },
                                   {
                                          "name": "Melanie Noble",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                   },
                                   {
                                          "name": "Chase Day",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg"
                                   },
                                   {
                                          "name": "Shawn Manning",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg"
                                   },
                                   {
                                          "name": "Soren Durham",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg"
                                   },
                                   {
                                          "name": "Cortez Herring",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg"
                                   },
                                   {
                                          "name": "Brycen Jimenez",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_13.jpg"
                                   },
                                   {
                                          "name": "Giana Brandt",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_14.jpg"
                                   },
                                   {
                                          "name": "Aspen Schmitt",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_15.jpg"
                                   },
                                   {
                                          "name": "Colten Aguilar",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_16.jpg"
                                   },
                                   {
                                          "name": "Angelique Morse",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg"
                                   },
                                   {
                                          "name": "Selina Boyer",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_18.jpg"
                                   },
                                   {
                                          "name": "Lawson Bass",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_19.jpg"
                                   },
                                   {
                                          "name": "Ariana Lang",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_20.jpg"
                                   }
                            ]
                     },
                     {
                            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
                            "publish": "draft",
                            "categorie": "categorie1",
                            "price": "500",
                            "profile": "VIP",
                            "metaKeywords": [
                                   "Fitness",
                                   "Nature",
                                   "Business"
                            ],
                            "content": "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
                            "comments": [
                                   {
                                          "id": "b353aca8-352b-4755-a88d-2e6959eb24ce",
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
                                          "message": "She eagerly opened the gift, her eyes sparkling with excitement.",
                                          "postedAt": "2025-01-21T13:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "name": "Jayvion Simon",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "name": "Lucian Obrien",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "name": "Deja Brady",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "9daf4e57-df8a-402a-a362-8fca7fac4488",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "message": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
                                                        "postedAt": "2025-01-20T12:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "8496c5bd-a47e-4c45-a78a-441607011a11",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "message": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
                                                        "tagUser": "Lucian Obrien",
                                                        "postedAt": "2025-01-19T11:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "326ff38c-3df1-4102-8238-88d85bf2f33d",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "message": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
                                                        "postedAt": "2025-01-18T10:54:57.988Z"
                                                 }
                                          ]
                                   },
                                   {
                                          "id": "206bab86-4b59-456e-a0c6-2bb7f4500874",
                                          "name": "Reece Chung",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
                                          "message": "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
                                          "postedAt": "2025-01-17T09:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                                        "name": "Lainey Davidson",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                                        "name": "Cristopher Cardenas",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                                        "name": "Melanie Noble",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "1dfde117-5005-45a6-a2c5-31ceab23bba1",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                                        "message": "The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.",
                                                        "postedAt": "2025-01-16T08:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "7955c5a0-a080-43a3-88d9-525bafa8c7ec",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                                        "message": "The waves crashed against the shore, creating a soothing symphony of sound.",
                                                        "postedAt": "2025-01-15T07:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "c0b810c1-f366-4fa2-91d3-b117fc3c3c77",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                                        "message": "The scent of blooming flowers wafted through the garden, creating a fragrant paradise.",
                                                        "postedAt": "2025-01-14T06:54:57.988Z"
                                                 }
                                          ]
                                   },
                                   {
                                          "id": "0b16f8a7-0df3-4414-a5f4-99f5343a1dd9",
                                          "name": "Chase Day",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
                                          "message": "She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.",
                                          "postedAt": "2025-01-13T05:54:57.988Z",
                                          "users": [],
                                          "replyComment": []
                                   },
                                   {
                                          "id": "b2419a3d-fc8b-4c25-befe-3363a009b371",
                                          "name": "Shawn Manning",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg",
                                          "message": "The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.",
                                          "postedAt": "2025-01-12T04:54:57.988Z",
                                          "users": [],
                                          "replyComment": []
                                   }
                            ],
                            "tags": [
                                   "Technology",
                                   "Marketing",
                                   "Design",
                                   "Photography",
                                   "Art"
                            ],
                            "metaTitle": "Minimal UI Kit",
                            "createdAt": "2025-01-19T11:54:57.989Z",
                            "title": "How to Master the Art of Public Speaking",
                            "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg",
                            "totalViews": 6984,
                            "totalShares": 2034,
                            "totalComments": 8488,
                            "totalFavorites": 3364,
                            "metaDescription": "The starting point for your next project with Minimal UI Kit",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
                            "author": {
                                   "name": "Harrison Stein",
                                   "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg"
                            },
                            "favoritePerson": [
                                   {
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                   },
                                   {
                                          "name": "Lucian Obrien",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                   },
                                   {
                                          "name": "Deja Brady",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                   },
                                   {
                                          "name": "Harrison Stein",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg"
                                   },
                                   {
                                          "name": "Reece Chung",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg"
                                   },
                                   {
                                          "name": "Lainey Davidson",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                   },
                                   {
                                          "name": "Cristopher Cardenas",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                   },
                                   {
                                          "name": "Melanie Noble",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                   },
                                   {
                                          "name": "Chase Day",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg"
                                   },
                                   {
                                          "name": "Shawn Manning",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg"
                                   },
                                   {
                                          "name": "Soren Durham",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg"
                                   },
                                   {
                                          "name": "Cortez Herring",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg"
                                   },
                                   {
                                          "name": "Brycen Jimenez",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_13.jpg"
                                   },
                                   {
                                          "name": "Giana Brandt",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_14.jpg"
                                   },
                                   {
                                          "name": "Aspen Schmitt",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_15.jpg"
                                   },
                                   {
                                          "name": "Colten Aguilar",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_16.jpg"
                                   },
                                   {
                                          "name": "Angelique Morse",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg"
                                   },
                                   {
                                          "name": "Selina Boyer",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_18.jpg"
                                   },
                                   {
                                          "name": "Lawson Bass",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_19.jpg"
                                   },
                                   {
                                          "name": "Ariana Lang",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_20.jpg"
                                   }
                            ]
                     },

              ]
       ), [] ); // Add dependencies if needed



       const [ filteredPosts, setFilteredPosts ] = useState( null );


       const newPost2 =
       {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b42",
              "publish": "draft",
              "categorie": "categorie1",
              "price": "500",
              "profile": "VIP",
              "metaKeywords": [
                     "Fitness",
                     "Nature",
                     "Business"
              ],
              "content": "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
              "comments": [
                     {
                            "id": "b353aca8-352b-4755-a88d-2e6959eb24ce",
                            "name": "Jayvion Simon",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
                            "message": "She eagerly opened the gift, her eyes sparkling with excitement.",
                            "postedAt": "2025-01-21T13:54:57.988Z",
                            "users": [
                                   {
                                          "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                   },
                                   {
                                          "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                          "name": "Lucian Obrien",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                   },
                                   {
                                          "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                          "name": "Deja Brady",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                   }
                            ],
                            "replyComment": [
                                   {
                                          "id": "9daf4e57-df8a-402a-a362-8fca7fac4488",
                                          "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                          "message": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
                                          "postedAt": "2025-01-20T12:54:57.988Z"
                                   },
                                   {
                                          "id": "8496c5bd-a47e-4c45-a78a-441607011a11",
                                          "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                          "message": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
                                          "tagUser": "Lucian Obrien",
                                          "postedAt": "2025-01-19T11:54:57.988Z"
                                   },
                                   {
                                          "id": "326ff38c-3df1-4102-8238-88d85bf2f33d",
                                          "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                          "message": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
                                          "postedAt": "2025-01-18T10:54:57.988Z"
                                   }
                            ]
                     },
                     {
                            "id": "206bab86-4b59-456e-a0c6-2bb7f4500874",
                            "name": "Reece Chung",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
                            "message": "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
                            "postedAt": "2025-01-17T09:54:57.988Z",
                            "users": [
                                   {
                                          "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                          "name": "Lainey Davidson",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                                   },
                                   {
                                          "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                          "name": "Cristopher Cardenas",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                                   },
                                   {
                                          "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                          "name": "Melanie Noble",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                   }
                            ],
                            "replyComment": [
                                   {
                                          "id": "1dfde117-5005-45a6-a2c5-31ceab23bba1",
                                          "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                                          "message": "The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.",
                                          "postedAt": "2025-01-16T08:54:57.988Z"
                                   },
                                   {
                                          "id": "7955c5a0-a080-43a3-88d9-525bafa8c7ec",
                                          "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                                          "message": "The waves crashed against the shore, creating a soothing symphony of sound.",
                                          "postedAt": "2025-01-15T07:54:57.988Z"
                                   },
                                   {
                                          "id": "c0b810c1-f366-4fa2-91d3-b117fc3c3c77",
                                          "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                                          "message": "The scent of blooming flowers wafted through the garden, creating a fragrant paradise.",
                                          "postedAt": "2025-01-14T06:54:57.988Z"
                                   }
                            ]
                     },
                     {
                            "id": "0b16f8a7-0df3-4414-a5f4-99f5343a1dd9",
                            "name": "Chase Day",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
                            "message": "She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.",
                            "postedAt": "2025-01-13T05:54:57.988Z",
                            "users": [],
                            "replyComment": []
                     },
                     {
                            "id": "b2419a3d-fc8b-4c25-befe-3363a009b371",
                            "name": "Shawn Manning",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg",
                            "message": "The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.",
                            "postedAt": "2025-01-12T04:54:57.988Z",
                            "users": [],
                            "replyComment": []
                     }
              ],
              "tags": [
                     "Technology",
                     "Marketing",
                     "Design",
                     "Photography",
                     "Art"
              ],
              "metaTitle": "Minimal UI Kit",
              "createdAt": "2025-01-19T11:54:57.989Z",
              "title": "How to Master the Art of Public Speaking",
              "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg",
              "totalViews": 6984,
              "totalShares": 2034,
              "totalComments": 8488,
              "totalFavorites": 3364,
              "metaDescription": "The starting point for your next project with Minimal UI Kit",
              "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
              "author": {
                     "name": "Harrison Stein",
                     "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg"
              },
              "favoritePerson": [
                     {
                            "name": "Jayvion Simon",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                     },
                     {
                            "name": "Lucian Obrien",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                     },
                     {
                            "name": "Deja Brady",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                     },
                     {
                            "name": "Harrison Stein",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg"
                     },
                     {
                            "name": "Reece Chung",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg"
                     },
                     {
                            "name": "Lainey Davidson",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg"
                     },
                     {
                            "name": "Cristopher Cardenas",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg"
                     },
                     {
                            "name": "Melanie Noble",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                     },
                     {
                            "name": "Chase Day",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg"
                     },
                     {
                            "name": "Shawn Manning",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg"
                     },
                     {
                            "name": "Soren Durham",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg"
                     },
                     {
                            "name": "Cortez Herring",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg"
                     },
                     {
                            "name": "Brycen Jimenez",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_13.jpg"
                     },
                     {
                            "name": "Giana Brandt",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_14.jpg"
                     },
                     {
                            "name": "Aspen Schmitt",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_15.jpg"
                     },
                     {
                            "name": "Colten Aguilar",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_16.jpg"
                     },
                     {
                            "name": "Angelique Morse",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg"
                     },
                     {
                            "name": "Selina Boyer",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_18.jpg"
                     },
                     {
                            "name": "Lawson Bass",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_19.jpg"
                     },
                     {
                            "name": "Ariana Lang",
                            "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_20.jpg"
                     }
              ]
       }
       // Add dependencies if needed


       const addPost = ( newPost ) =>
       {
              const newPostWithId = { ...newPost, id: Date.now() }; // Génère un id basé sur le timestamp actuel
              const updatedPosts = [ ...filteredPosts, newPostWithId ];

              console.log( 'fonctio appeler', updatedPosts );

              setFilteredPosts( updatedPosts );
       };


       useEffect( () =>
       {
              if ( posts )
              {
                     setFilteredPosts( posts );
              }
       }, [ posts ] ); // Dépendance : déclenche l'effet chaque fois que `board` change


       const { searchResults, searchLoading } = useSearchPosts( debouncedQuery );

       const dataFiltered = applyFilter( {
              inputData: filteredPosts,
              filters,
              sortBy,
       } );

       const handleSortBy = useCallback( ( newValue ) =>
       {
              setSortBy( newValue );
       }, [] );



       const handleSearch = useCallback( ( inputValue ) =>
       {
              setSearchQuery( inputValue );
       }, [] );



       const filterByArguments = useCallback(
              ( type, value ) =>
              {
                     if ( value[ 0 ] === 'all' )
                     {
                            // Si "all" est spécifié ou si le tableau est vide, afficher tous les posts

                            setFilteredPosts( posts );

                     } else
                     {
                            // Filtrer les posts si la propriété correspond à l'une des valeurs du tableau
                            const result = posts.filter( ( item ) => Array.isArray( value ) && value.includes( item[ type ] ) );
                            setFilteredPosts( result );
                            // console.log( 'Valeur filtrée', result );
                     }

                     // console.log( 'Valeur des posts', type, value );
              },
              [ posts ] // Dépend uniquement de `posts`
       );



       const handleFilters = useCallback( ( name, value ) =>
       {
              // setFilters( ( prevState ) => ( {
              //        ...prevState,
              //        [ name ]: value,
              // } ) );

              filterByArguments( value );

       }, [ filterByArguments ] );

       const handleFilterPublish = useCallback(
              ( event, newValue ) =>
              {

                     console.log( newValue );
                     filterByArguments( 'profile', [ newValue ] );
                     setSelectedTab( newValue )

                     // handleFilters( 'categorie', newValue );
              },

              [ filterByArguments ]
       );


       const setfilt = useCallback(
              ( newValue ) =>
              {

                     console.log( newValue );
                     setFilters( {
                            publish: newValue,
                     } )
              },

              []
       );


       const filterByPriceRange = ( minPrice, maxPrice ) =>
       {
              setFilteredPosts( () =>
                     filteredPosts.filter( ( post ) =>
                     {
                            const { price } = post;

                            // Filtrer par prix minimum ou maximum
                            if ( minPrice && !maxPrice ) return price >= minPrice;
                            if ( maxPrice && !minPrice ) return price <= maxPrice;

                            // Filtrer par plage de prix si les deux sont spécifiés
                            if ( minPrice && maxPrice ) return price >= minPrice && price <= maxPrice;

                            // Aucun filtre
                            return true;
                     } )
              );
       };










       const renderFilters = (
              <TourFilters
                     open={ openFilters.value }
                     onOpen={ openFilters.onTrue }
                     onClose={ openFilters.onFalse }
                     onArgumentFilters={ filterByArguments }

              />

       );





       return (
              <Container maxWidth={ settings.themeStretch ? false : 'xl' }>
                     {/* <CustomBreadcrumbs
                            heading="List"
                            links={ [
                                   {
                                          name: 'Dashboard',
                                          href: paths.dashboard.root,
                                   },
                                   {
                                          name: 'Blog',
                                          href: paths.dashboard.post.root,
                                   },
                                   {
                                          name: 'List',
                                   },
                            ] }
                            action={
                                   <Button
                                          component={ RouterLink }
                                          href={ paths.dashboard.post.new }
                                          variant="contained"
                                          startIcon={ <Iconify icon="mingcute:add-line" /> }
                                   >
                                          New Post
                                   </Button>
                            }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     /> */}

                     {/* <Stack
                            spacing={ 3 }
                            justifyContent="space-between"
                            alignItems={ { xs: 'flex-end', sm: 'center' } }
                            direction={ { xs: 'column', sm: 'row' } }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     >
                            <PostSearch
                                   query={ debouncedQuery }
                                   results={ searchResults }
                                   onSearch={ handleSearch }
                                   loading={ searchLoading }
                                   hrefItem={ ( title ) => paths.dashboard.post.details( title ) }
                            />

                            <PostSort sort={ sortBy } onSort={ handleSortBy } sortOptions={ POST_SORT_OPTIONS } />
                     </Stack> */}



                     <Stack
                            spacing={ 1 }
                            justifyContent="space-between"
                            alignItems={ { xs: 'flex-end', sm: 'center' } }
                            direction={ { xs: 'column', sm: 'row' } }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     >
                            <Button onClick={ () => addPost( newPost2 ) }>
                                   ajouter post
                            </Button>
                            <Tabs
                                   value={ selectedTab }
                                   onChange={ handleFilterPublish }
                                   sx={ {
                                          mb: { xs: 3, md: 5 },
                                   } }
                            >
                                   { [ 'all', 'VIP', 'Standard' ].map( ( tab ) => (
                                          <Tab
                                                 key={ tab }
                                                 iconPosition="end"
                                                 value={ tab }
                                                 label={ tab }
                                                 icon={
                                                        <Label
                                                               variant={ ( ( tab === 'all' || tab === filters.publish ) && 'filled' ) || 'soft' }
                                                               color={ ( tab === 'VIP' && 'info' ) || 'default' }
                                                        >
                                                               { tab === 'all' && posts.length }

                                                               { tab === 'VIP' && posts.filter( ( post ) => post.categorie === 'VIP' ).length }

                                                               { tab === 'Standard' && posts.filter( ( post ) => post.categorie === 'Standard' ).length }
                                                        </Label>
                                                 }
                                                 sx={ { textTransform: 'capitalize' } }
                                          />
                                   ) ) }
                            </Tabs>

                            { renderFilters }

                     </Stack>


                     {/* <Button variant='soft' onClick={ () => filterByPriceRange( Number( '2000' ), Number( '3000' ) ) }>
                            prix entre 2000 et 3000
                     </Button>
                     <Button sx={ { ml: 1 } } variant='soft' onClick={ () => filterByArguments( 'categorie', [ 'categorie1' ] ) }>
                            categorie1
                     </Button>

                     <Button sx={ { ml: 1 } } variant='soft' onClick={ () => filterByArguments( 'categorie', [ 'categorie2' ] ) }>
                            categorie2
                     </Button>

                     <Button sx={ { ml: 1 } } variant='soft' onClick={ () => filterByArguments( 'categorie', [ 'categorie3', 'categorie1' ] ) }>
                            categorie1 et 3
                     </Button> */}
                     {/* <PostList posts={ dataFiltered } loading={ postsLoading } /> */ }
                     <PostListHorizontal posts={ dataFiltered } loading={ postsLoading } />
              </Container>
       );
}

// ----------------------------------------------------------------------

const applyFilter = ( { inputData, filters, sortBy } ) =>
{
       const { publish } = filters;

       if ( sortBy === 'latest' )
       {
              inputData = orderBy( inputData, [ 'createdAt' ], [ 'desc' ] );
       }

       if ( sortBy === 'oldest' )
       {
              inputData = orderBy( inputData, [ 'createdAt' ], [ 'asc' ] );
       }

       if ( sortBy === 'popular' )
       {
              inputData = orderBy( inputData, [ 'totalViews' ], [ 'desc' ] );
       }

       if ( publish !== 'all' )
       {
              inputData = inputData.filter( ( post ) => post.publish === publish );
       }

       return inputData;
};
