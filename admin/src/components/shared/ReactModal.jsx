import React, {useContext, useState} from 'react';
import Modal from 'react-modal';
import ButtonSecondary from "./ButtonSecondary";
import ArticleContext from "../../context/ArticleContext";
import Preloader from "../layout/Preloader";
import ModalContent from "../layout/ModalContent";
import {AiFillCloseCircle} from 'react-icons/ai'


function ReactModal(props) {
    const Page = document.querySelector('.article-page')
    const {ArticleState: {articleReady}, getArticleByID} = useContext(ArticleContext)
    let { id, ...other } = props;
    let subtitle;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "100%",
            maxHeight: "40rem",
            width: '100%',
            maxWidth: "50rem"
        },
        overlay: {
            background: 'rgba(77,77,77,0.65)',
        }
    };
    const [modalIsOpen, setIsOpen] = useState();

    function openModal() {
        setIsOpen(true);
        getArticleByID(id)
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <ButtonSecondary type={'submit'} handleClick={openModal}>Preview</ButtonSecondary>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={''}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                appElement={Page}
            >
                <div className="modalClose">
                    <AiFillCloseCircle size={'1.4rem'} onClick={closeModal}/>
                </div>
                <div className="modalContentWrapper">
                    {articleReady ?
                        <ModalContent  {...props} /> :
                        <div className="preloaderWrapper">
                            <Preloader type={'spin'} color={'#25CCBD'}/>
                        </div>
                    }
                </div>

            </Modal>
        </div>
    );
}

export default ReactModal;