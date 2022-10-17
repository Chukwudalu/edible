import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ArrowForwardIos
            className={'MuiIcon-fontSizeLarge carousel-arrow carousel-arrow--next'}
            style={{ ...style,  zIndex: 2000 }}
            onClick={onClick}
        />
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ArrowBackIos
            className={'MuiIcon-fontSizeLarge carousel-arrow carousel-arrow--prev'}
            style={{ ...style, zIndex: 2000 }}
            onClick={onClick}
        />
    );
}
const settings = {
    dots: true,
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    swipeToSlide: true,
    centerPadding: "30px",
    cancelable: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            },
        },

        {
            breakpoint: 1150,
            settings: {
            slidesToShow: 5,
            infinite: true,
            dots: true,
            },
        },

        {
            breakpoint: 1030,
            settings: {
            slidesToShow: 4,
            infinite: true,
            dots: true,
            },
        },
        {
            breakpoint: 880,
            settings: {
            slidesToShow: 3,
            infinite: true,
            dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 3,
            initialSlide: 2,
            infinite: true,
            dots: true
            },
        },
        {
            breakpoint: 640,
            settings: {
            slidesToShow: 2,
            initialSlide: 2,
            infinite: true,
            dots: true
            },
        },
        {
            breakpoint: 400,
            settings: {
            slidesToShow: 1,
            initialSlide: 2,
            infinite: true,
            dots: true
            }
        }
    ]
};

export default settings