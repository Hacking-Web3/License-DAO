import "antd/dist/antd.css";
import "../../styles/css/app.css";
import { Form, Input, Button } from "antd";
import React from 'react';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: "${label} is required!"
};
/* eslint-enable no-template-curly-in-string */

function getBase64(img: Blob, callback: (arg0: string | ArrayBuffer | null) => any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: { type: string; size: number; }) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export class UserForm extends React.Component {
    state = {
        loading: false,
        imageUrl: undefined
    };

    handleChange = (info: { file: { status: string; originFileObj: Blob; }; }) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
            </div>
        );
        const onFinish = (values: any) => {
            console.log(values);
        };

        return (
            <div>
                <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>
                <div>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={["user", "name"]}
                            label="Name"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input placeholder="Add your name" />
                        </Form.Item>
                        <Form.Item name={["user", "about"]} label="About">
                            <Input.TextArea placeholder="Share a bit about you"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
