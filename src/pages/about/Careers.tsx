import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildTitle } from "../../seo";

export default function Careers() {
    return (
        <>
            <Helmet>
                <title>{buildTitle("Careers")}</title>
                <meta name="description" content="Tuyển dụng tại Alino." />
            </Helmet>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-4xl px-6 py-14">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">Careers</h1>
                        <Link className="underline text-sm" to="/">Trang chủ</Link>
                    </div>

                    <p className="mt-4 text-gray-600">
                        Trang Careers (placeholder). Sau khi site chạy ổn, bạn nhét JD thật vào đây.
                    </p>

                    <div className="mt-8 flex gap-4 text-sm">
                        <Link className="underline" to="/about">About</Link>
                        <Link className="underline" to="/partners">Partners</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
