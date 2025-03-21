import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy( () => import( 'src/pages/byTemplate/components' ) );

// FOUNDATION
const ColorsPage = lazy( () => import( 'src/pages/byTemplate/components/foundation/colors' ) );
const TypographyPage = lazy( () => import( 'src/pages/byTemplate/components/foundation/typography' ) );
const ShadowsPage = lazy( () => import( 'src/pages/byTemplate/components/foundation/shadows' ) );
const GridPage = lazy( () => import( 'src/pages/byTemplate/components/foundation/grid' ) );
const IconsPage = lazy( () => import( 'src/pages/byTemplate/components/foundation/icons' ) );

// MUI COMPONENTS
const AccordionPage = lazy( () => import( 'src/pages/byTemplate/components/mui/accordion' ) );
const AlertPage = lazy( () => import( 'src/pages/byTemplate/components/mui/alert' ) );
const AutocompletePage = lazy( () => import( 'src/pages/byTemplate/components/mui/autocomplete' ) );
const AvatarPage = lazy( () => import( 'src/pages/byTemplate/components/mui/avatar' ) );
const BadgePage = lazy( () => import( 'src/pages/byTemplate/components/mui/badge' ) );
const BreadcrumbsPage = lazy( () => import( 'src/pages/byTemplate/components/mui/breadcrumbs' ) );
const ButtonsPage = lazy( () => import( 'src/pages/byTemplate/components/mui/buttons' ) );
const CheckboxPage = lazy( () => import( 'src/pages/byTemplate/components/mui/checkbox' ) );
const ChipPage = lazy( () => import( 'src/pages/byTemplate/components/mui/chip' ) );
const DataGridPage = lazy( () => import( 'src/pages/byTemplate/components/mui/data-grid' ) );
const DialogPage = lazy( () => import( 'src/pages/byTemplate/components/mui/dialog' ) );
const ListPage = lazy( () => import( 'src/pages/byTemplate/components/mui/list' ) );
const MenuPage = lazy( () => import( 'src/pages/byTemplate/components/mui/menu' ) );
const PaginationPage = lazy( () => import( 'src/pages/byTemplate/components/mui/pagination' ) );
const PickersPage = lazy( () => import( 'src/pages/byTemplate/components/mui/pickers' ) );
const PopoverPage = lazy( () => import( 'src/pages/byTemplate/components/mui/popover' ) );
const ProgressPage = lazy( () => import( 'src/pages/byTemplate/components/mui/progress' ) );
const RadioButtonsPage = lazy( () => import( 'src/pages/byTemplate/components/mui/radio-button' ) );
const RatingPage = lazy( () => import( 'src/pages/byTemplate/components/mui/rating' ) );
const SliderPage = lazy( () => import( 'src/pages/byTemplate/components/mui/slider' ) );
const StepperPage = lazy( () => import( 'src/pages/byTemplate/components/mui/stepper' ) );
const SwitchPage = lazy( () => import( 'src/pages/byTemplate/components/mui/switch' ) );
const TablePage = lazy( () => import( 'src/pages/byTemplate/components/mui/table' ) );
const TabsPage = lazy( () => import( 'src/pages/byTemplate/components/mui/tabs' ) );
const TextFieldPage = lazy( () => import( 'src/pages/byTemplate/components/mui/textfield' ) );
const TimelinePage = lazy( () => import( 'src/pages/byTemplate/components/mui/timeline' ) );
const TooltipPage = lazy( () => import( 'src/pages/byTemplate/components/mui/tooltip' ) );
const TransferListPage = lazy( () => import( 'src/pages/byTemplate/components/mui/transfer-list' ) );

// EXTRA COMPONENTS
const AnimatePage = lazy( () => import( 'src/pages/byTemplate/components/extra/animate' ) );
const CarouselsPage = lazy( () => import( 'src/pages/byTemplate/components/extra/carousel' ) );
const ChartPage = lazy( () => import( 'src/pages/byTemplate/components/extra/chart' ) );
const CopyToClipboardPage = lazy( () => import( 'src/pages/byTemplate/components/extra/copy-to-clipboard' ) );
const EditorPage = lazy( () => import( 'src/pages/byTemplate/components/extra/editor' ) );
const FormValidationPage = lazy( () => import( 'src/pages/byTemplate/components/extra/form-validation' ) );
const ImagePage = lazy( () => import( 'src/pages/byTemplate/components/extra/image' ) );
const LabelPage = lazy( () => import( 'src/pages/byTemplate/components/extra/label' ) );
const LightboxPage = lazy( () => import( 'src/pages/byTemplate/components/extra/lightbox' ) );
const MapPage = lazy( () => import( 'src/pages/byTemplate/components/extra/map' ) );
const MegaMenuPage = lazy( () => import( 'src/pages/byTemplate/components/extra/mega-menu' ) );
const MultiLanguagePage = lazy( () => import( 'src/pages/byTemplate/components/extra/multi-language' ) );
const NavigationBarPage = lazy( () => import( 'src/pages/byTemplate/components/extra/navigation-bar' ) );
const OrganizationalChartPage = lazy( () => import( 'src/pages/byTemplate/components/extra/organization-chart' ) );
const ScrollbarPage = lazy( () => import( 'src/pages/byTemplate/components/extra/scroll' ) );
const SnackbarPage = lazy( () => import( 'src/pages/byTemplate/components/extra/snackbar' ) );
const TextMaxLinePage = lazy( () => import( 'src/pages/byTemplate/components/extra/text-max-line' ) );
const UploadPage = lazy( () => import( 'src/pages/byTemplate/components/extra/upload' ) );
const MarkdownPage = lazy( () => import( 'src/pages/byTemplate/components/extra/markdown' ) );
const ScrollProgressPage = lazy( () => import( 'src/pages/byTemplate/components/extra/scroll-progress' ) );
const WalktourPage = lazy( () => import( 'src/pages/byTemplate/components/extra/walktour' ) );

// ----------------------------------------------------------------------

export const componentsRoutes = [
       {
              element: (
                     <MainLayout>
                            <Suspense fallback={ <SplashScreen /> }>
                                   <Outlet />
                            </Suspense>
                     </MainLayout>
              ),
              children: [
                     {
                            path: 'components',
                            children: [
                                   { element: <IndexPage />, index: true },
                                   {
                                          path: 'foundation',
                                          children: [
                                                 {
                                                        element: <Navigate to="/components/foundation/colors" replace />,
                                                        index: true,
                                                 },
                                                 { path: 'colors', element: <ColorsPage /> },
                                                 { path: 'typography', element: <TypographyPage /> },
                                                 { path: 'shadows', element: <ShadowsPage /> },
                                                 { path: 'grid', element: <GridPage /> },
                                                 { path: 'icons', element: <IconsPage /> },
                                          ],
                                   },
                                   {
                                          path: 'mui',
                                          children: [
                                                 {
                                                        element: <Navigate to="/components/mui/accordion" replace />,
                                                        index: true,
                                                 },
                                                 { path: 'accordion', element: <AccordionPage /> },
                                                 { path: 'alert', element: <AlertPage /> },
                                                 { path: 'autocomplete', element: <AutocompletePage /> },
                                                 { path: 'avatar', element: <AvatarPage /> },
                                                 { path: 'badge', element: <BadgePage /> },
                                                 { path: 'breadcrumbs', element: <BreadcrumbsPage /> },
                                                 { path: 'buttons', element: <ButtonsPage /> },
                                                 { path: 'checkbox', element: <CheckboxPage /> },
                                                 { path: 'chip', element: <ChipPage /> },
                                                 { path: 'data-grid', element: <DataGridPage /> },
                                                 { path: 'dialog', element: <DialogPage /> },
                                                 { path: 'list', element: <ListPage /> },
                                                 { path: 'menu', element: <MenuPage /> },
                                                 { path: 'pagination', element: <PaginationPage /> },
                                                 { path: 'pickers', element: <PickersPage /> },
                                                 { path: 'popover', element: <PopoverPage /> },
                                                 { path: 'progress', element: <ProgressPage /> },
                                                 { path: 'radio-button', element: <RadioButtonsPage /> },
                                                 { path: 'rating', element: <RatingPage /> },
                                                 { path: 'slider', element: <SliderPage /> },
                                                 { path: 'stepper', element: <StepperPage /> },
                                                 { path: 'switch', element: <SwitchPage /> },
                                                 { path: 'table', element: <TablePage /> },
                                                 { path: 'tabs', element: <TabsPage /> },
                                                 { path: 'textfield', element: <TextFieldPage /> },
                                                 { path: 'timeline', element: <TimelinePage /> },
                                                 { path: 'tooltip', element: <TooltipPage /> },
                                                 { path: 'transfer-list', element: <TransferListPage /> },
                                          ],
                                   },
                                   {
                                          path: 'extra',
                                          children: [
                                                 {
                                                        element: <Navigate to="/components/extra/animate" replace />,
                                                        index: true,
                                                 },
                                                 { path: 'animate', element: <AnimatePage /> },
                                                 { path: 'carousel', element: <CarouselsPage /> },
                                                 { path: 'chart', element: <ChartPage /> },
                                                 { path: 'copy-to-clipboard', element: <CopyToClipboardPage /> },
                                                 { path: 'editor', element: <EditorPage /> },
                                                 { path: 'form-validation', element: <FormValidationPage /> },
                                                 { path: 'image', element: <ImagePage /> },
                                                 { path: 'label', element: <LabelPage /> },
                                                 { path: 'lightbox', element: <LightboxPage /> },
                                                 { path: 'map', element: <MapPage /> },
                                                 { path: 'mega-menu', element: <MegaMenuPage /> },
                                                 { path: 'multi-language', element: <MultiLanguagePage /> },
                                                 { path: 'navigation-bar', element: <NavigationBarPage /> },
                                                 {
                                                        path: 'organization-chart',
                                                        element: <OrganizationalChartPage />,
                                                 },
                                                 { path: 'scroll', element: <ScrollbarPage /> },
                                                 { path: 'snackbar', element: <SnackbarPage /> },
                                                 { path: 'text-max-line', element: <TextMaxLinePage /> },
                                                 { path: 'upload', element: <UploadPage /> },
                                                 { path: 'markdown', element: <MarkdownPage /> },
                                                 { path: 'scroll-progress', element: <ScrollProgressPage /> },
                                                 { path: 'walktour', element: <WalktourPage /> },
                                          ],
                                   },
                            ],
                     },
              ],
       },
];
