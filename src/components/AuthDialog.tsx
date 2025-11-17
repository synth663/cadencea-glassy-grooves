import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
    console.log("Login:", { loginEmail, loginPassword });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Signup logic will be implemented later
    console.log("Signup:", { signupName, signupEmail, signupPassword });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-effect border-primary/20 glow-effect p-0 overflow-hidden">
        <Tabs defaultValue="login" className="w-full">
          <div className="p-6 pb-0">
            <TabsList className="glass-effect border-border/30 bg-transparent">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gradient-accent data-[state=active]:text-gradient rounded-none px-6 font-poppins"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gradient-accent data-[state=active]:text-gradient rounded-none px-6 font-poppins"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="p-6 pt-6 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="font-poppins text-foreground/90">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary rounded-xl font-poppins"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="font-poppins text-foreground/90">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary rounded-xl font-poppins"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                className="w-full rounded-xl font-poppins font-semibold"
              >
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="p-6 pt-6 space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="font-poppins text-foreground/90">
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary rounded-xl font-poppins"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="font-poppins text-foreground/90">
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary rounded-xl font-poppins"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="font-poppins text-foreground/90">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary rounded-xl font-poppins"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                className="w-full rounded-xl font-poppins font-semibold"
              >
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
