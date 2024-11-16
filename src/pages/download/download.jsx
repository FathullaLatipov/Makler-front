import axios from 'axios';
import './main.scss';
const Download = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  const sendReferalCode = async url => {
    try {
      await axios.post(
        'https://api.makleruz.uz/authorization/add-referral-score/',
        {
          ref_code: refCode,
        }
      );
      window.open(url, '_blank');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col  min-h-[80vh] ">
      <h1 className="text-[30px] font-bold font-SFProDisplay_500 sm:text-[40px]">
        Makleruz ilovasini yuklab oling
      </h1>

      <div className="flex">
        <button
          onClick={() =>
            sendReferalCode(
              'https://apps.apple.com/uz/app/makleruz/id6466745648'
            )
          }
        >
          <img
            width={300}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1024px-Download_on_the_App_Store_Badge.svg.png"
            alt=""
          />
        </button>
        <button
          onClick={() =>
            sendReferalCode(
              'https://play.google.com/store/apps/details?id=uz.makler.app'
            )
          }
        >
          <img
            width={350}
            src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Download;
