import * as React from 'react';
import { Fragment, memo } from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';
import {
    BooleanField,
    BulkExportButton,
    ChipField,
    Datagrid,
    DateField,
    downloadCSV,
    List,
    NumberField,
    ReferenceArrayField,
    SearchInput,
    SingleFieldList,
    TextField,
    TextInput,
    useTranslate,
    useResourceContext,
    useResourceDefinitions
} from 'react-admin'; // eslint-disable-line import/no-unresolved



const QuickFilter = ({ label, source, defaultValue }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const postFilter = [
    <SearchInput source="q" alwaysOn />,
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />,
    <QuickFilter
        label="resources.posts.fields.commentable"
        source="commentable"
        defaultValue
    />,
];

const exporter = posts => {
    const data = posts.map(post => ({
        ...post,
        backlinks: lodashGet(post, 'backlinks', []).map(
            backlink => backlink.url
        ),
    }));
    return jsonExport(data, (err, csv) => downloadCSV(csv, 'pastOrders'));
};

const StyledDatagrid = styled(Datagrid)(({ theme }) => ({
    '& .title': {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& .hiddenOnSmallScreens': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .column-tags': {
        minWidth: '9em',
    },
    '& .publishedAt': { fontStyle: 'italic' },
}));

const PostListBulkActions = memo(({ children, ...props }) => (
    <Fragment>
        <BulkExportButton {...props} />
    </Fragment>
));

const title = "Past Orders"
const PastOrderList = () => (
    <>
        <h1>{title}</h1>
        <List
            filters={postFilter}
            sort={{ field: 'published_at', order: 'DESC' }}
            exporter={exporter}
            title="Past Orders"
        >
            <StyledDatagrid
                bulkActionButtons={<PostListBulkActions />}
                optimized
            >
                <TextField source="id" />
                <TextField source="title" cellClassName="title" />
                <DateField
                    source="published_at"
                    sortByOrder="DESC"
                    cellClassName="publishedAt"
                />

                <BooleanField
                    source="commentable"
                    label="resources.posts.fields.commentable_short"
                    sortable={false}
                />
                <NumberField source="views" sortByOrder="DESC" />
                <ReferenceArrayField
                    label="Tags"
                    reference="tags"
                    source="tags"
                    sortBy="tags.name"
                    sort={tagSort}
                    cellClassName="hiddenOnSmallScreens"
                    headerClassName="hiddenOnSmallScreens"
                >
                    <SingleFieldList>
                        <ChipField source="name.en" size="small" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </StyledDatagrid>
        
        </List>
    </>
)
;

const tagSort = { field: 'name.en', order: 'ASC' };

export default PastOrderList;
