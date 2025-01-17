"use client";
import { Form, Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/assets/css/base.module.css";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import { BsCloudUpload } from "react-icons/bs";
import ImagePreview from "@/components/Modals/ImagePreview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const AddField = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [data, setData] = useState({
        slug: "",
        title: "",
        short_description: "",
        description: "",
        buttonText: "",
        buttonLink: "",
        image: null,
        alt: "",
        metas: ""
    });
    const [imagePreview, setImagePreview] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleMedia = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post(Apis.uploadFile, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setData({ ...data, image: res.data.url });
            toast.success("Client image uploaded successfully");
        } catch (err) {
            console.log(err);
        }
    };

    const createField = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(Apis.createField, data);
            setData({
                slug: "",
                title: "",
                short_description: "",
                description: "",
                buttonText: "",
                buttonLink: "",
                image: null,
                alt: "",
                metas: "",
            });
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    };

    return (
        <>
            <ToastContainer />
            {imagePreview && (
                <ImagePreview
                    image={data.image}
                    setImagePreview={setImagePreview}
                />
            )}
            <div className="container-fluid">
                <div className="d-flex align-items-center gap-3">
                    <div
                        onClick={() => router.back()}
                        className="d-inline-block bg-primary px-2 py-1 rounded-3"
                        style={{ cursor: "pointer" }}
                    >
                        <IoMdArrowBack color="white" size={25} />
                    </div>
                    <h4 className={`m-0 ${styles.xlFont}`}>Add Service </h4>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title d-flex justify-content-between align-items-center">
                            <h2>Add Service</h2>
                        </div>
                    </div>
                    <div className="card-body px-md-4">
                        <Form onSubmit={createField} className="upload-form">
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Slug
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 me-5 mt-0">
                                    <Form.Control
                                        type="text"
                                        placeholder="eg. service-slug"
                                        value={data.slug}
                                        onChange={(e) => setData({ ...data, slug: e.target.value })}
                                        className="form-control form-control-lg form-input"
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Service Name
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 me-5 mt-0">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Service Name..."
                                        value={data.title}
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                        className="form-control form-control-lg form-input"
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Description
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-0 me-md-5">
                                    {isClient && (
                                        <Editor
                                            apiKey="an08ruvf6el10km47b0qr7vkwpoldafttauwj424r7y8y5e2"
                                            value={data.description}
                                            init={{
                                                height: 250,
                                                menubar: false,
                                                plugins: [
                                                    'autolink',
                                                    'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                    'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                                                ],
                                                toolbar: 'undo redo | casechange blocks | bold italic backcolor forecolor| ' +
                                                    'alignleft aligncenter alignright alignjustify | ' +
                                                    'bullist numlist  outdent indent | removeformat |  code table help'
                                            }}
                                            onEditorChange={(content) => setData({ ...data, description: content })}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Button Text
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 me-5 mt-0">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Button Text..."
                                        value={data.buttonText}
                                        onChange={(e) => setData({ ...data, buttonText: e.target.value })}
                                        className="form-control form-control-lg form-input"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Button Link
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 me-5 mt-0">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Button Link..."
                                        value={data.buttonLink}
                                        onChange={(e) => setData({ ...data, buttonLink: e.target.value })}
                                        className="form-control form-control-lg form-input"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group">
                                <div className="col-12 col-md-3">
                                    <Form.Label
                                        htmlFor="inputClientFile"
                                        className="col-form-label form-label d-flex justify-content-left justify-content-md-center"
                                    >
                                        Upload Image
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-5">
                                    <div
                                        className="form-group d-flex flex-column align-items-center mb-20 upload-input"
                                        style={{ height: "150px" }}
                                    >
                                        <Form.Label
                                            className="form-label flex-column form-img-uploader rounded-4 d-flex align-items-center justify-content-center w-100 py-4"
                                            style={{ cursor: "pointer" }}
                                            htmlFor="fieldImage"
                                        >
                                            <BsCloudUpload size={40} color="gray" />
                                            <h6 className={`text-center py-3 ${styles.smFont}`}>
                                                Upload Image / Icon
                                            </h6>
                                        </Form.Label>
                                        {data.image && (
                                            <h6
                                                className={`text-center text-primary ${styles.mdFont}`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setImagePreview(true)}
                                            >
                                                Click to preview
                                            </h6>
                                        )}
                                    </div>
                                </div>
                                <Form.Control
                                    id="fieldImage"
                                    hidden
                                    type="file"
                                    onChange={handleMedia}
                                    placeholder="Social Link Icon"
                                    className="flex-grow-1 p-2"
                                />
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2">
                                <div className="col-12 col-md-3">
                                    <Form.Label className="col-form-label form-label d-flex justify-content-left justify-content-md-center">
                                        Image Alt
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 me-5 mt-0">
                                    <Form.Control
                                        type="text"
                                        placeholder="Image Alt"
                                        value={data.alt}
                                        onChange={(e) => setData({ ...data, alt: e.target.value })}
                                        className="form-control form-control-lg form-input"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="row form-group mt-1 mt-md-2 ">
                                <div className="col-12 col-md-3">
                                    <Form.Label className={`col-form-label form-label d-flex justify-content-start justify-content-md-center`}>
                                        Meta Tags
                                    </Form.Label>
                                </div>
                                <div className="col-12 col-md-8 mt-0 me-5">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter Meta Tags"
                                        value={data.metas}
                                        onChange={(e) => setData({ ...data, metas: e.target.value })}
                                        className={`form-control form-control-lg form-textbox`}
                                    />
                                </div>
                            </Form.Group>
                            <div className="row">
                                <div className="col-4 col-md-3"></div>
                                <div className="col-12 col-md-9 form-button">
                                    <Button
                                        role="button"
                                        variant="secondary"
                                        className="btn form-cancel"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="btn form-btn">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddField;
