import { useState, useEffect } from 'react';

function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    allowRegistration: false,
    allowTeacherRegistration: false,
    emailNotification: false,
    maxUploadSize: 10,
    allowedFileTypes: '',
    maintenanceMode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      console.error('获取系统设置失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      alert('设置保存成功');
    } catch (err) {
      console.error('保存设置失败:', err);
      alert('保存设置失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">系统设置</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">基本设置</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              网站名称
            </label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              网站描述
            </label>
            <textarea
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 注册设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">注册设置</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="allowRegistration"
              checked={settings.allowRegistration}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              允许学生注册
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="allowTeacherRegistration"
              checked={settings.allowTeacherRegistration}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              允许教师注册
            </label>
          </div>
        </div>

        {/* 上传设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">上传设置</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              最大上传大小 (MB)
            </label>
            <input
              type="number"
              name="maxUploadSize"
              value={settings.maxUploadSize}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              允许的文件类型 (用逗号分隔)
            </label>
            <input
              type="text"
              name="allowedFileTypes"
              value={settings.allowedFileTypes}
              onChange={handleChange}
              placeholder="jpg,png,pdf,doc,docx"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 其���设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">其他设置</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="emailNotification"
              checked={settings.emailNotification}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              启用邮件通知
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              维护模式
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {saving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SystemSettings; 