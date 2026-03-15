import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type PaymentSubmission = {
    name : Text;
    email : Text;
    whatsapp : Text;
    transactionId : Text;
    productId : Text;
    amount : Nat;
    timestamp : Time.Time;
  };

  type AccessCode = {
    code : Text;
    reportId : Text;
    subscriberName : Text;
    subscriberEmail : Text;
    subscriberWhatsapp : Text;
    transactionId : Text;
    isUsed : Bool;
    createdAt : Time.Time;
    usedAt : ?Time.Time;
  };

  module PaymentSubmission {
    public func compare(a : PaymentSubmission, b : PaymentSubmission) : Order.Order {
      Nat.compare(a.timestamp.toNat(), b.timestamp.toNat());
    };
  };

  let paymentSubmissions = Map.empty<Text, PaymentSubmission>();
  let accessCodes = Map.empty<Text, AccessCode>();

  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    AccessControl.claimFirstAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func submitPaymentSubmission(
    name : Text,
    email : Text,
    whatsapp : Text,
    transactionId : Text,
    productId : Text,
    amount : Nat,
  ) : async () {
    let submission : PaymentSubmission = {
      name;
      email;
      whatsapp;
      transactionId;
      productId;
      amount;
      timestamp = Time.now();
    };
    paymentSubmissions.add(transactionId, submission);
  };

  public query ({ caller }) func getAllPaymentSubmissions() : async [PaymentSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all payment submissions");
    };
    paymentSubmissions.values().toArray().sort();
  };

  public shared ({ caller }) func createAccessCode(
    code : Text,
    reportId : Text,
    subscriberName : Text,
    subscriberEmail : Text,
    subscriberWhatsapp : Text,
    transactionId : Text,
  ) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create access codes");
    };

    switch (accessCodes.get(code)) {
      case (?_) { false };
      case (null) {
        let newCode : AccessCode = {
          code;
          reportId;
          subscriberName;
          subscriberEmail;
          subscriberWhatsapp;
          transactionId;
          isUsed = false;
          createdAt = Time.now();
          usedAt = null;
        };
        accessCodes.add(code, newCode);
        true;
      };
    };
  };

  public shared ({ caller }) func redeemAccessCode(code : Text) : async ?{
    reportId : Text;
    subscriberName : Text;
    subscriberEmail : Text;
  } {
    switch (accessCodes.get(code)) {
      case (null) { null };
      case (?accessCode) {
        if (accessCode.isUsed) {
          return null;
        };
        let updatedCode = {
          accessCode with
          isUsed = true;
          usedAt = ?Time.now();
        };
        accessCodes.add(code, updatedCode);
        ?{
          reportId = accessCode.reportId;
          subscriberName = accessCode.subscriberName;
          subscriberEmail = accessCode.subscriberEmail;
        };
      };
    };
  };

  public query ({ caller }) func getAllAccessCodes() : async [AccessCode] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all access codes");
    };
    accessCodes.values().toArray();
  };

  public shared ({ caller }) func deleteAccessCode(code : Text) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete access codes");
    };

    switch (accessCodes.get(code)) {
      case (null) { false };
      case (?_) {
        accessCodes.remove(code);
        true;
      };
    };
  };

  public query ({ caller }) func getAccessCodeByCode(code : Text) : async ?AccessCode {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view access codes");
    };
    accessCodes.get(code);
  };
};
