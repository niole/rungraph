import * as React from "react";
import * as R from "ramda";
import { Input, DatePicker, Form, Modal, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Map } from './Map';
import { Run } from './types';

const onSubmit = (
    form: CreateEditViewRunProp['form'],
    onModalSubmit?: CreateEditViewRunProp['onModalSubmit'],
) => () => {
    return new Promise((resolve, reject) => {
        let timer: any;
        timer = setTimeout(() => {
            const values = form.getFieldsValue();
            if (onModalSubmit) {
                onModalSubmit({
                    distance: values.distance,
                    route: values.route,
                    date: values.date
                });
            }
            resolve(values);
        }, 500);
        form.validateFields(['date', 'distance', 'route'], (errors, values) => {
            if (R.values(errors).join().length) {
                clearTimeout(timer);
                reject(errors);
            }
        });
    });
}

const handleOk = (onSubmit: () => Promise<any>, showModal: (show: boolean) => void) => () => {
    onSubmit().then(() => {
        showModal(false);
    }).catch((error: any) => {
        console.error(error);
    });
};

export type CreateEditViewRunProp = FormComponentProps<any> & {
    onModalSubmit?: (run: Run) => void;
};

export const EditModal: React.FC<CreateEditViewRunProp> = ({
    onModalSubmit,
    form,
}) => {
    const { getFieldDecorator } = form;
    const [visible, showModal] = React.useState(false);
    return (
        <>
            <Button shape="circle" icon="plus" type="primary" onClick={() => showModal(!visible)} />
            <Modal
                title="Add New Run"
                visible={visible}
                onOk={handleOk(onSubmit(form, onModalSubmit), showModal)}
                onCancel={() => showModal(false)}
            >
                <Form.Item label="date">
                    {getFieldDecorator('date', {
                        rules: [
                            { required: true, message: 'Please select date', type: 'date' },
                        ],
                    })(<DatePicker />)}
                </Form.Item>
                <Form.Item label="distance">
                    {getFieldDecorator('distance', {
                        getValueFromEvent: event => {
                            const value = parseFloat(event.target.value);
                            if (isNaN(value)) {
                                return event.target.value;
                            }
                            return value;
                        },
                        rules: [
                            { required: true, message: 'Please input miles distance', type: 'number' },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="route">
                    {getFieldDecorator('route', {
                        getValueFromEvent: R.identity,
                        rules: [
                            { required: true, message: 'Please select a route', type: 'array' },
                        ],
                    })(<Map />)}
                </Form.Item>
            </Modal>
        </>
    );
};

export const CreateEditViewRun = Form.create<CreateEditViewRunProp>({ name: 'validate_other' })(EditModal);
