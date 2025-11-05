from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
import razorpay

from .models import *
from .serializers import *


# ------------------------------
# 🔑 Razorpay Initialization
# ------------------------------
razorpay_client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


# ------------------------------
# 🌐 Simple Home Endpoint
# ------------------------------
def home(request):
    return HttpResponse("Hello!")



class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)




# ------------------------------    
# 💳 RAZORPAY ORDER CREATION
# ------------------------------
class CreateOrderView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        amount = 34900  # amount in paise (Rs. 349.00)
        currency = 'INR'

        try:
            razorpay_order = razorpay_client.order.create(dict(
                amount=amount,
                currency=currency,
                payment_capture='1'
            ))
            return Response(
                {
                    'order_id': razorpay_order['id'],
                    'amount': razorpay_order['amount'],
                    'currency': razorpay_order['currency']
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ------------------------------
# 💰 PAYMENT VERIFICATION
# ------------------------------
class VerifyPaymentView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        payment_id = request.data.get('razorpay_payment_id', '')
        order_id = request.data.get('razorpay_order_id', '')
        signature = request.data.get('razorpay_signature', '')

        params_dict = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }

        try:
            razorpay_client.utility.verify_payment_signature(params_dict)
            return Response({'status': 'Payment Successful'}, status=status.HTTP_200_OK)
        except razorpay.errors.SignatureVerificationError:
            return Response(
                {'status': 'Payment Failed', 'error': 'Signature verification failed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
