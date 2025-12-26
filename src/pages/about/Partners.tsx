import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Partners() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("Partners")}</title>
                <meta name="description" content="Thông tin hợp tác cùng Alino." />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-4xl px-6 py-14">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
                        <Link className="underline text-sm" to="/">Trang chủ</Link>
                    </div>

                    <p className="mt-4 text-gray-600">
                        Trang Partners (placeholder). Bạn có thể thay nội dung thật sau khi routing ổn lại.
                    </p>

                    <div className="mt-8 flex gap-4 text-sm">
                        <Link className="underline" to="/about">About</Link>
                        <Link className="underline" to="/about-alino">Về Alino</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
