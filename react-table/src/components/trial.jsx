import React, { useState } from 'react';
import { Divider, Table, Modal, Input, Button } from 'antd';

export default function Practice() {

    const columns = [
        {
            title: 'SNo',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <DescriptionCell description={text} />
            )
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <button onClick={() => handleView(record)} className="action-button border border-blue-500 text-blue-500 px-5 py-1 mr-2 edit">Edit</button>
                    <button className="action-button border border-red text-red px-5 py-1 delete">Delete</button>
                </span>
            )
        }
    ];

    const [table, setTable] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editedRow, setEditedRow] = useState(null);

    const fetching = async () => {
        let res = await fetch('https://dummyjson.com/products');
        let datas = await res.json();
        if (datas.products.length > 0) {
            setTable(datas.products);
        }
    };

    React.useEffect(() => {
        fetching();
    }, []);

    const DescriptionCell = ({ description }) => {
        const [readMore, setReadMore] = React.useState(false);

        const toggleReadMore = () => {
            setReadMore(!readMore);
        };

        const displayText = readMore ? description : description.slice(0, 80);

        return (
            <div>
                <p>{displayText}</p>
                {description.length > 80 && (
                    <span onClick={toggleReadMore} style={{ cursor: 'pointer', color: 'blue' }}>
                        {readMore ? 'Hide more...' : 'See more...'}
                    </span>
                )}
            </div>
        );
    };

    const handleView = (record) => {
        setEditedRow({ ...record });
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const handleInputChange = (key, value) => {
        setEditedRow({ ...editedRow, [key]: value });
    };

    const handleSave = () => {
        const updatedTable = table.map((row) =>
            row.id === editedRow.id ? editedRow : row
        );
        setTable(updatedTable);
        setVisible(false);
        setEditedRow(null);
    };

    return (
        <div className='ml-14'>
            <div className="font-semibold text-2xl text-subheading ml-12 mt-2">
                <h1 className='user-select-none'>User Info</h1>
            </div>
            <div className='ml-12 mt-4'>
                <Divider />
                <Table
                    columns={columns}
                    dataSource={table.map(item => ({
                        key: item.id,
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        img: (
                            item.images && item.images.length > 0 &&
                            <img src={item.images[0]} style={{ maxWidth: '100px' }} alt="Product" />
                        )
                    }))}
                />
                <Modal
                    title="Edit Details"
                    visible={visible}
                    onCancel={handleClose}
                    footer={[
                        <Button key="cancel" onClick={handleClose}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    ]}
                >
                    {editedRow && (
                        <div>
                            <p>
                                <strong>ID:</strong> {editedRow.id}
                            </p>
                            <p>
                                <strong>Title:</strong>{' '}
                                <Input
                                    value={editedRow.title}
                                    onChange={(e) =>
                                        handleInputChange('title', e.target.value)
                                    }
                                />
                            </p>
                            <p>
                                <strong>Price:</strong>{' '}
                                <Input
                                    value={editedRow.price}
                                    onChange={(e) =>
                                        handleInputChange('price', e.target.value)
                                    }
                                />
                            </p>
                            <p>
                                <strong>Description:</strong>{' '}
                                <Input.TextArea
                                    value={editedRow.description}
                                    onChange={(e) =>
                                        handleInputChange('description', e.target.value)
                                    }
                                />
                            </p>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}