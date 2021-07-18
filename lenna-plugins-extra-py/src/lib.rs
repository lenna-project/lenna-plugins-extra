use pyo3::prelude::*;
#[pymodule]
fn lenna_plugins_extra_py(py: Python, m: &PyModule) -> PyResult<()> {
    lenna_core::export_python_plugin!(denoise::Denoise, "denoise", py, m);
    lenna_core::export_python_plugin!(text::Text, "text", py, m);
    lenna_core::export_python_plugin!(watermark::Watermark, "watermark", py, m);
    Ok(())
}
