import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Globe, 
  Shield, 
  Mail, 
  Database, 
  Users, 
  FileText,
  Save,
  Download,
  Upload
} from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Site Settings
    siteName: 'Sangguniang Bayan CMS',
    siteDescription: 'Official Legislative Content Management System',
    contactEmail: 'info@municipality.gov.ph',
    contactPhone: '(02) 8XXX-XXXX',
    address: 'Municipal Hall, Main Street, Municipality',
    
    // System Settings
    maxFileSize: '10',
    allowedFileTypes: 'pdf,doc,docx,jpg,png,mp4',
    sessionTimeout: '60',
    enableRegistration: false,
    enablePublicComments: true,
    
    // Security Settings
    requireApproval: true,
    enableAuditLog: true,
    enableBackup: true,
    backupFrequency: 'weekly',
    
    // Notification Settings
    emailNotifications: true,
    announcementNotifications: true,
    hearingReminders: true,
    documentUploadNotifications: true
  });

  const handleSave = (section: string) => {
    // Simulate saving settings
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "System configuration export has been initiated.",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Created",
      description: "Database backup has been created successfully.",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Settings className="w-8 h-8" />
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure system preferences and administrative options
          </p>
        </div>
      </div>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Site
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
        </TabsList>

        {/* Site Settings */}
        <TabsContent value="site" className="space-y-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Municipal Address</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSave('Site')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Site Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireApproval">Require Document Approval</Label>
                  <p className="text-sm text-muted-foreground">All documents must be approved before publication</p>
                </div>
                <Switch
                  id="requireApproval"
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => setSettings({...settings, requireApproval: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableAuditLog">Enable Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Track all user actions and system changes</p>
                </div>
                <Switch
                  id="enableAuditLog"
                  checked={settings.enableAuditLog}
                  onCheckedChange={(checked) => setSettings({...settings, enableAuditLog: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.allowedFileTypes}
                  onChange={(e) => setSettings({...settings, allowedFileTypes: e.target.value})}
                  placeholder="pdf,doc,docx,jpg,png"
                />
              </div>
              
              <Button onClick={() => handleSave('Security')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email notifications for system events</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="announcementNotifications">Announcement Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify users of new announcements</p>
                </div>
                <Switch
                  id="announcementNotifications"
                  checked={settings.announcementNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, announcementNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="hearingReminders">Hearing Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders for upcoming hearings</p>
                </div>
                <Switch
                  id="hearingReminders"
                  checked={settings.hearingReminders}
                  onCheckedChange={(checked) => setSettings({...settings, hearingReminders: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="documentUploadNotifications">Document Upload Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify about new document uploads</p>
                </div>
                <Switch
                  id="documentUploadNotifications"
                  checked={settings.documentUploadNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, documentUploadNotifications: checked})}
                />
              </div>
              
              <Button onClick={() => handleSave('Notifications')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="government-card">
              <CardHeader>
                <CardTitle>Database Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableBackup">Enable Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup database</p>
                  </div>
                  <Switch
                    id="enableBackup"
                    checked={settings.enableBackup}
                    onCheckedChange={(checked) => setSettings({...settings, enableBackup: checked})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button onClick={handleBackup} className="w-full" variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Create Manual Backup
                  </Button>
                  <Button onClick={handleExport} className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="government-card">
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">System Version:</span>
                    <Badge variant="outline">v2.1.0</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Database Size:</span>
                    <span className="text-sm">124.8 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Documents:</span>
                    <span className="text-sm">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Active Users:</span>
                    <span className="text-sm">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Backup:</span>
                    <span className="text-sm">2024-01-15 14:30</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Label className="text-sm font-medium">System Health:</Label>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Database</span>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Storage</span>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Performance</span>
                      <Badge className="bg-success text-success-foreground">Good</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableRegistration">Enable User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <Switch
                  id="enableRegistration"
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => setSettings({...settings, enableRegistration: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enablePublicComments">Enable Public Comments</Label>
                  <p className="text-sm text-muted-foreground">Allow public users to comment on documents</p>
                </div>
                <Switch
                  id="enablePublicComments"
                  checked={settings.enablePublicComments}
                  onCheckedChange={(checked) => setSettings({...settings, enablePublicComments: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">User Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">Administrators</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">7</div>
                    <div className="text-sm text-muted-foreground">Council Members</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Active Sessions</div>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => handleSave('User')} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save User Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;